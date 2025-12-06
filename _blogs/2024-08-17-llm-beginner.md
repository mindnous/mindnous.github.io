---
layout: blog
title: LLM Finetuning for Beginner
date: 2024-08-17 00:00:00+0800
description: a journey of finetuning LLM on custom dataset.
tags: llm finetune
categories: llm
giscus_comments: false
related_posts: false
featured: false
---

Have you ever considered about what is it that needs to be trained to run LLM? What is the dataset format to do the finetuning? Or maybe, what in the world is this LLM anyway? Well, in this post, we're going to learn all of that.

<span style="font-size:8vw"> LLM </span> | Large Language-Model, is a branch of Natural Language Processing (NLP) where it steps up the game where you not only understand the basic Q&A that has been trained on, but they're also trained to answer non-trained scenario (albeits far from perfect) by utilizing a huge of given datasets.

Token, is one of the key in the NLP area, where it will dictate the max output that LLMs could produce in one inquiry. The way they trained on, which feeds on inputs on some question/inquiries, gives N-output, then compared with Tokenized ground truth, gives them kind-of non-constrained way to answer inputs, which enable them to focus on giving you desired output based on things that it's trained on. **This focus** often produces hallucination, or basically garbage output that looks as if it is a fact, which is something that is an ongoing topic to solve.

Back to the basic, after briefly knowing LLM, then how do we finetune it? Well, it can be done by doing the following:

1. Import packages and initialize model.
2. Define the tunable layer/LORA.
3. Define your dataset.
4. Set the model trainer.
5. Start training and done!

---

## 1. Import Packages and Intiailize Model

To import packages and initialize the model, it can be done easily by calling it from Huggingface's transformer function `FastLanguageModel.from_pretrained` as the following:

```python
# step 1. Import packages
import torch
from unsloth import FastLanguageModel, is_bfloat16_supported
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import load_dataset

# step 2. Set max token, and define your model and model type
max_seq_length = 2048
load_in_4bit = True
fourbits_model = "unsloth/Meta-Llama-3.1-8B-bnb-4bit"

# step 3. Load the model and the tokenized (convert text LLM's input format)
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = fourbits_model,
    max_seq_length = max_seq_length,
    dtype = None,
    load_in_4bit = load_in_4bit,
    attn_implementation="flash_attention_2"
)
```

As in the above code's comments, we only need to import packages for every package usage that we want to use, set parameters so that we can do subsequent task without re-set the value repeatedly, and load model resources to call the model into the jupyter/python code.

---

## 2. Define the Tunable Layer/LORA

After that, we need to define our LORA config, since the base LLM model won't be trained due to the data type constraint (int4 can't be retrained). Using LORA, we can finetune any LLMs on the internet to a specific usecase based on whatever dataset we've trained on. If you are a neural network/computer vision enginee, you can imagine LORA as an additional linear layer + sigmoid on top of a pretrained resnet50 model. To define LORA configuration, we need to call `FastLanguageModel.get_peft_model` as follows:

```python
# Do model patching and add fast LoRA weights
model = FastLanguageModel.get_peft_model(
    model,
    r = 16,
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj",
                      "gate_proj", "up_proj", "down_proj",],
    lora_alpha = 32,
    lora_dropout = 0, # Supports any, but = 0 is optimized
    bias = "none",    # Supports any, but = "none" is optimized
    # [NEW] "unsloth" uses 30% less VRAM, fits 2x larger batch sizes!
    use_gradient_checkpointing = "unsloth", # True or "unsloth" for very long context
    random_state = 3407,
    max_seq_length = max_seq_length,
    use_rslora = False,  # We support rank stabilized LoRA
    loftq_config = None, # And LoftQ
)
```

In here, we set LORA rank=16, and alpha to 32 according to best practice [explained in here](https://magazine.sebastianraschka.com/p/practical-tips-for-finetuning-llms#:~:text=If%20you're%20incorporating%20LoRA,at%20twice%20the%20rank's%20value.), max_seq_length (or max token), and whether to use unsloth, which could further optimize training speed while reducing GPU memory consumption.

## 3. Define Your Dataset

In this step, you need to define your training dataset that you want to train it on. And beware, this is one of the most important steps in almost any machine learning technique, where you need to ensure correctness and clearness of the input. But for simplicity sake, we will directly use the open source LAION dataset without any cleaning as below:

```
url = "https://huggingface.co/datasets/laion/OIG/resolve/main/unified_chip2.jsonl"
dataset = load_dataset("json", data_files = {"train" : url}, split = "train")
print(dataset.data[0])
```

```text
# OUTPUT
Human: Describe the location where you find yourself in a serene scene inside of a medieval inn with a rice paper screen.
Bot: Sturdy rectory tables and low benches offer a quiet place to eat and drink food brought with you or bought from the nearby bakery. At the back of the room, the door leading to the kitchen and the owner's private quarters is half-hidden by a rice paper screen.",
---
Human: I want to find out more about a certain type of bird.
Bot: That sounds like a great idea. What kind of bird are you interested in?",
---
Human: round number to nearest integer
Bot: Here is some code to round number 4.0005 up to 3 decimal places, round(4.0005, 3)
---
Human: I don't understand my tax form. Can you help explain?
Bot: I'm sorry, I'm not able to help with your tax form. It is best to consult a tax specialist or the IRS for further explanation.",
```

## 4. Set the Trainer Model

Next, we need to set our trainer, this is done by calling `SFTTrainer`, where we will define batch size, warmup steps, max steps, learning rate etc.

```
trainer = SFTTrainer(
    model = model,
    train_dataset = dataset,
    dataset_text_field = "text",
    max_seq_length = max_seq_length,
    tokenizer = tokenizer,
    args = TrainingArguments(
        per_device_train_batch_size = 2,
        gradient_accumulation_steps = 4,
        warmup_steps = 20,
        max_steps = 120,
        fp16 = not is_bfloat16_supported(),
        bf16 = is_bfloat16_supported(),
        logging_steps = 1,
        learning_rate = 5e-5,
        weight_decay = 0.01,
        output_dir = "outputs",
        optim = "adamw_8bit",
        lr_scheduler_type = "linear",
        seed = 3407,
    ),
)
```

## 5. Start Training and Done!

Now for the final step, we just simply need to call the .train(), and observe the loss decreasing, and in the end save the trained model, and Voila, that's it!

```
trainer.train()
trainer.save_model("path/to/model")
```

> Hope you enjoy the post shared in here and see you in the next post~

---

## Complete Jupyter Notebook Code

{::nomarkdown}
{% jupyter_notebook "../../assets/jupyter/FineTuneLLM.ipynb" %}
{:/nomarkdown}
