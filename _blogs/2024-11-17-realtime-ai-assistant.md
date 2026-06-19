---
layout: blog
title: Realtime Speech-to-Speech AI Assistant
date: 2024-11-17 23:00:00+0800
description: Realtime Speech-to-Speech AI Assistant with Speech-to-text (STT), Large-Language Model (LLM), and Text-to-speech (TTS).
tags: detection
categories: LLM
thumbnail: images/blogs/20240908_segment.webp
giscus_comments: true
related_posts: true
featured: true
---

## Introduction

<img loading="lazy" decoding="async" src="../../images/blogs/20241117_AI_ASSISTANT.webp" alt="Description" class="img-fluid rounded z-depth-1">

> I've reviewed many posts from great reviewers, and realize that sometimes, informative posts could be packed into such simple and short explanation. From now in, I am going to start similar things and hope that you guys could take more from simple things explained below!

Back to the topic...

Say, Large-Language Models are the trend, aren't they? They are like a conversational wiki and problem solvers that could enhance our productivity. However, let's face it, you don't wanna pay a dime for it, do you? xD
Just kidding. Well then, in case that:
a. You are currently considering an online/cloud-based Large-Language Models.\
b. You don't want to waste tons of watts for your AI Assistant like what was used in the mighty ChatGPT/Claude/gRok models.\
c. You feel dissatisfied with your current paid-based LLM.\
d. Or maybe, you just don't want to pass your hard-earned money to them anymore but you still want an end-to-end real time LLM assistant that you could talk to and reply to you in texts/voices.

Then this post will relate to you a lot. In this post, I am going to introduce you an end-to-end, speech-to-speech voice assistant, that uses Large-Language Models and uses only 10 Watt-hour. For your information, I am going to call this developed AI Assistant as "Bob", and it's open source for non-commercial purpose. For your info, the code [is available in this repo](https://github.com/briliantnugraha/rockchip_ai_assistant.git). Without further ado, let's jump into it!

---

## What is "Bob"

Bob basically consists of three parts:

a. OpenAI-Whipser, a Speech-to-text (STT) model that converts voices into text (output: text).\
b. Qwen2.5-1.5B, A Large-Language Model (LLM) as our AI agent that we will be interacting with (output: text).\
c. gTTs/piper, a Text-to-speech (TTS) model that converts text into speech/voices (output: voice).
d. Gradio app, a simple UI that could help me to connect Bob to multiple environment/devices.

## How do I Build It into a 10 Watt-Hour Device

To do this, I am going to use a cheap + energy efficient arm device, called as Orange Pi 5.

## How Much Does It Cost?

In this project, I am using these configurations below. In total, it takes only 80 USD to make all that works.

a. A 70 USD arm device, called Orange Pi-5 4GB.\
b. A charging adapter. Nothing fancy, just a 5V-2A cable (estimate to be 7 for adapter+cable).\
c. An Ethernet LAN cable for 3 USD, or a WIFI dongle if you have one.\
d. Any usable WIFI/router.

---

## How To Run the Code?

Check [my repo in here](https://github.com/briliantnugraha/rockchip_ai_assistant.git), clone the repo, download all necessary models, and run the script below.

a. With Internet Connection (very fast TTS)

```
python3 demo.py --rkllm_model_path ./model/qwen25_1.5b.rkllm --target_platform rk3588
```

b. No Internet Connection Required (very slow TTS)

```
python3 demo.py --rkllm_model_path ./model/qwen25_1.5b.rkllm --target_platform rk3588 --disable_gtts
```

And voila! You've successfully started your AI-Assistant.

## Bob/AI Assistant in Action!

<video src="{{ 'assets/video/20241118_laptop.mp4' | relative_url }}" controls preload="none" playsinline  style="max-width: 100%; height: auto;"></video>
<video src="{{ 'assets/video/20241118_phone.mp4' | relative_url }}" controls preload="none" playsinline  style="max-width: 100%; height: auto;"></video>

## Current Limitation

As of today, I still haven't enabled history in the LLM prompt due to a concern on out-of-memory issue. I will check more detail on how to enable the history with Rockchip docs and see whether it could cause out-of-memory issue or not.

## Behind The Story

I will also share my experience in exploring this project in my next post in here, so stay tune!

> ## Reference
>
> [Qwen2.5](https://github.com/QwenLM/Qwen2.5) \
> [RKNN Toolkit](https://github.com/airockchip/rknn-toolkit2.git)\
> [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo.git)\
> [RKNN-LLM](https://github.com/airockchip/rknn-llm.git)

> Hope you enjoy the post shared in here and see you in the next post~

---
