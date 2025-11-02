---
layout: service
title: Testing LLAMA3.1 70B on a Budget PC Build
date: 2024-08-24 11:00:00+0800
description: test big LLM on ensembled budget PC.
tags: llm
categories: llm
thumbnail: images/blogs/082424_budget_vs_llama.png
giscus_comments: false
related_posts: true
featured: false
---

---

## Introduction

---

<img src="../../images/blogs/082424_budget_vs_llama.png" alt="Description" class="img-fluid rounded z-depth-1">



Hi everyone, today, I want to answer my own curiosity on **whether budget PC build could run big Large Language Model (LLM)**? For a context, what I want to run is LLAMA3.1 70B, a big LLM (for me) which theoretically requires ~280 GB of GPU memory on a PC with Full-Precision (FP32). But wait a second, how do we build a budget PC with those humongous GPU requirement? Well, not really, at least for now, but we have the next best thing, which is LLM quantization. Quantization is one of the most common deployment choices for machine learning people due to its practicality and hardware availability. For example, running FP32 to FP16, INT8, INT4, and INT2 from the same LLAMA3.1 model could run with only ~140, ~70,~35, or even lower GBs of GPU memory with lower bit-per-weight (BPW) ratios. However, the lower the quantization used, the lower the accuracy compared to the original. But for today, to maximize hardware availability and better results, we will try to run [LLAMA3.1 70B Q2_K/INT2 from here](https://huggingface.co/bartowski/Meta-Llama-3.1-70B-Instruct-GGUF).

## Setup

---

To test the image, we are going to do the following:

1. Setup Our Budget PC Build.
2. Download Our Testing [LLAMA3.1 70B Q2_K/INT2 Model](https://huggingface.co/bartowski/Meta-Llama-3.1-70B-Instruct-GGUF).
3. Download Ollama Package.
4. Prepare Ollama Model.
5. Run the 70B LLM!

### 1. Setup Budget PC Build

---

For your information, I use my own compact PC with M-ATX build, hence why I need to **hang** my GPU orthogonally to the PC case. For more specific specs, it is as below:

- GPU: RTX 3060 12 GB (TDP 165 Watt) + RTX 4060 TI 16 GB (TDP 175 Watt)
- CPU: Ryzen 7 5700x
- RAM: 24 GB
- Case: M-ATX
- PSU: 550 Watt.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img src="../../images/blogs/082424_ss_pcbuild.jpg" alt="Description" class="img-fluid rounded z-depth-1">
    </div>
    <div class="col-sm mt-3 mt-md-0">
    </div>
</div>

FYI, the budget PC build in here is using the cheapest RTX with the most GPU memory, which is RTX 3060 12G purchased in 2021 and RTX 4060 TI 16G purchased in this month, which have way less prices compared to their much pricier siblings. Also, as you might notice, my CPU RAM < GPU VRAM xD, which is kind of hilarious, but at the time of making this post, my new ordered RAM is still not coming yet, so I will make do with just the current setup. Jokes aside, I was also wondering whether my tiny Power Supply could handle those two GPU tower, but after checking the TDP specs, it seems to be okay-ish. Hence, we're ready to do the next steps!

### 2. Download Our Testing LLAMA3.1 70B Q2_K/INT2 Model

This step is the easiest step, you can [open the link available in here](https://huggingface.co/bartowski/Meta-Llama-3.1-70B-Instruct-GGUF), go to **Files and versions** submenu, and scroll to Q2_K model (26.4 GB), and click the download icon as in the illustrations below.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <img src="../../images/blogs/082424_hf_fav.jpg" alt="Description" class="img-fluid rounded z-depth-1">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img src="../../images/blogs/082424_hf_dl.jpg" alt="Description" class="img-fluid rounded z-depth-1">
    </div>
</div>

### 3. Download Ollama Package

To run this test, We will use Ollama as the LLM framework. They do have a docker just in case that you want a simpler environment to setup, albeit with more time. But for this test, we will just install it from Ollama's provided link (Linux or WSL user) as follows:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

For Windows users, you can download [the Ollama Setup here](https://github.com/ollama/ollama/releases/download/v0.3.7-rc6/OllamaSetup.exe), and do normal installation procedure with the file.

### 4. Prepare Ollama Model

In order to use our testing model (Q2_K/INT2), we are going to link the testing model with Ollama:
a. Create a file that points to the path of our testing model. In this test, I name the file **llama3.1_70b** as in the screenshot below.
<img src="../../images/blogs/082424_createmodel.png" alt="Description" class="img-fluid rounded z-depth-1">
b. Create a model that transfer our testing model to Ollama accepted format file. In this test, we call the Ollama's newly created file as **example** as in the figure below.
<img src="../../images/blogs/082424_ss_progress_create.png" alt="Description" class="img-fluid rounded z-depth-1">
c. When the create model step is done, it should show the following instructions.
<img src="../../images/blogs/082424_ss_finish.png" alt="Description" class="img-fluid rounded z-depth-1">

> ##### Done
>
> The last step is to Run the LLM
> {: .block-tip }

### 5. Run the 70B LLM!

Now, the moment of truth, are we capable to run 70B LLM with ensemble PC built on a budget PC build which cost < 1000$ USD (total GPU price today ~600 USD + MOBO etc 300 USD)?

Well, the answer is, absolutely YES! I am really happy that we can run the 70B model on the PC given my tight budget. It also means that **people doesn't really need to pursue the mighty pricy RX4090** and could just build it with 2 budget/reuse your old GPUS to run the current SOTA LLAMA3.1 70B on Huggingface Leaderboard.

Okay, no more nonsense, here is the full record of LLAMA 70B running with 3.9 - 4.45 token/sec.

<video src="{{ 'assets/video/082424_live_llama31_70b.mp4' | relative_url }}" controls preload  style="max-width: 100%; height: auto;"></video>


> Hope you enjoy the post shared in here and see you in the next post~

---
