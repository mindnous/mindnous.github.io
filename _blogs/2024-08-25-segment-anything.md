---
layout: blog
title: Segment Anything Explained
date: 2024-08-27 19:00:00+0800
description: A user-friendly explanation on Segment Anything (SAM).
tags: detection
categories: detection
thumbnail: images/blogs/20240827_sam_pencil.webp
giscus_comments: true
related_posts: true
featured: false
---

---

## Introduction

---

<img loading="lazy" decoding="async" src="../../images/blogs/20240827_sam_pencil.webp" alt="Description" class="img-fluid rounded z-depth-1">


It has been 1.5 years since the release of Segment Anything (SAM), where it steals the focus of public with its vast potentials on many fields: medics, factory, analysis, business, labeling, you name it, they (should) have it by then. However, the thing raises a very basic question, "what makes SAM so powerful"? Well, in this post, we're going to find out just that, and so that we could come to undertand the beauty of SAM, potentials of it, and maybe to extend this method on your specific use-cases. Everything that is discussed in here is based on the [basic1](https://towardsdatascience.com/all-you-need-to-know-about-attention-and-transformers-in-depth-understanding-part-1-552f0b41d021) and [basic2](https://www.v7labs.com/blog/vision-transformer-guide) of Transformer and [the original SAM paper](https://arxiv.org/pdf/2304.02643).

## What makes Segment Anything So Powerful?

---

From my overall experiments and paper readings over the years, there are 3 distincts methods used in SAM that makes it quite robust:

1. It Uses Transformer, i.e. Vision Transformer (ViT).
2. Supervised + Semi-Supervised + Self-supervised learnings.
3. Self Scoring.

### It Uses Transformer

---

Until recently, Transformer is still an unknown word/methodology to us, until 2017 where it was first introduced to address the issue encountered by Natural Language Processsing (NLP) practitioners, and finally to the Computer Vision field in 2019. In this post, I am not going to explain all of the basic theorems/step-by-step of Transformers, but I will share you the links on it in [here](https://towardsdatascience.com/all-you-need-to-know-about-attention-and-transformers-in-depth-understanding-part-1-552f0b41d021) and [here](https://www.v7labs.com/blog/vision-transformer-guide).

Maybe many of us are wondering about "why transformer works better than traditional Convolutional Neural Network (CNN) or Fully Connected Layer"? To put it simply, transformer utilizes weighting to provider "attention" mechanism so that the network could focus more on certain object parts/things automatically while omiting unimportant areas/things somewhere else.

Traditionally, Convolutional Neural Network utilizes kernels to do local mapping/feature extraction of certain areas in the image. However, this creates localized informations that are not shared across the channel, which could create a phenomenon where an object could be detected easily on some area, but could not be detected on another area. This is where fully connected (**FC**) and Attention/Transformer layers excel in.

For this illustration, I will make an example of self-attention layer. In the self-attention layer, we will use our intermediate features in a self-weighting mechanism, where we multiply itself with the same features as a self weighting mechanism, followed by another dot product with itself to produced weighted output, familiarly known as **self attention layer**.

<img loading="lazy" decoding="async" src="../../images/blogs/20240827_attention.webp" alt="Description" class="img-fluid rounded z-depth-1">

<div class="caption">
    Figure 1. Self-Attention Layer Illustration.  
</div>

Just a side note, to some extend, attention layer is quite similar to a stack of Fully Connected Layer with (possibly) different input and scaling, with the advantage in the self-weighting and cross weighting for attention mechanism across different layer, i.e. cross attention layer.

### Supervised + Semi-Supervised + Self-Supervised Learnings

---

<img loading="lazy" decoding="async" src="../../images/blogs/20240827_stages.webp" alt="Description" class="img-fluid rounded z-depth-1">

<div class="caption">
    Figure 2. 3 Stages in SAM training: first, they will do manual + online supervised learning, followed by semi-supervised learning in the second stage that is basically similar to the online supervised learning in the first stage, and finalized with self supervised learning in Stage 3 by utilizing self mask scoring + mask stability filter.  
</div>

#### Supervised Stage

---

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img loading="lazy" decoding="async" src="../../images/blogs/20240827_1_manual_stage.webp" alt="Description" class="img-fluid rounded z-depth-1">
    </div>
    <div class="col-sm mt-3 mt-md-0">
    </div>
</div>
<div class="caption">
    Courtesy to SAM Paper | Stage 1, Supervised + Online Supervised Learning Stage.
</div>

In the manual stage, it is basically similar to the normal training with annotations, where SAM was trained after sufficient number of annotations gathered. After that, they do online supervised learning where the ground truth will come from both human annotators + predicted masks from SAM.

#### Semi-Supervised Stage

---

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img loading="lazy" decoding="async" src="../../images/blogs/20240827_2_semiauto_stage.webp" alt="Description" class="img-fluid rounded z-depth-1">
    </div>
    <div class="col-sm mt-3 mt-md-0">
    </div>
</div>
<div class="caption">
    Courtesy to SAM Paper | Stage 2, Semi Supervised Stage.
</div>

In this stage, it is quite similar to the Online Supervised Learning, but with fewer annotation/image. This semi-supervised learning stage will basically add harder cases for the model to train on.

#### Self-Supervised Stage

---

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img loading="lazy" decoding="async" src="../../images/blogs/20240827_3_ssl_stage.webp" alt="Description" class="img-fluid rounded z-depth-1">
    </div>
    <div class="col-sm mt-3 mt-md-0">
    </div>
</div>

### Self Scoring | Ambiguity Aware Output

---

In this step, they will output multiple masks (whole, part, and subpart) given ambiguous prompt / points and its confidence score, then filter out the lower scores by utilizing Non Maximum Suppression + Low confidence score ([set to 0.88 by default](https://github.com/facebookresearch/segment-anything/blob/main/segment_anything/automatic_mask_generator.py#L41)). By utilizing this, it could determine whether the mask objects/parts/subparts are more suitable, self-removing less relevant masks, and gives the most appropriate output (well, based on it's own confidence score) respectively.

## Segment Anything/Everything in Action

---

Well, without further ado, let's do real inference on images, and below are the image outputs resulted from SAM, feel free to use the code and change it to your desired images.

<video src="{{ 'assets/video/20240827_sam_output.mp4' | relative_url }}" controls preload="none" playsinline  style="max-width: 100%; height: auto;"></video>

```python
from segment_anything import SamAutomaticMaskGenerator, sam_model_registry
import numpy as np, torch, matplotlib.pyplot as plt, cv2


def show_anns(anns):
    if len(anns) == 0:
        return
    sorted_anns = sorted(anns, key=(lambda x: x['area']), reverse=True)
    ax = plt.gca()
    ax.set_autoscale_on(False)

    img = np.ones((sorted_anns[0]['segmentation'].shape[0], sorted_anns[0]['segmentation'].shape[1], 4))
    img[:,:,3] = 0
    for ann in sorted_anns:
        m = ann['segmentation']
        color_mask = np.concatenate([np.random.random(3), [0.35]])
        img[m] = color_mask
    ax.imshow(img)

print('init SAM')
sam = sam_model_registry["vit_b"](checkpoint="sam_vit_b_01ec64.pth")
sam = sam.eval().cuda()
mask_generator = SamAutomaticMaskGenerator(sam, pred_iou_thresh=0.7, stability_score_thresh=0.8, stability_score_offset=0.9)

image = cv2.imread('11.jpg')
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
with torch.inference_mode():
    masks = mask_generator.generate(image)
print('Inference finish', len(masks))
plt.figure(figsize=(20,20))
plt.imshow(image)
show_anns(masks)
plt.axis('off')
plt.show()
```

# Potential of SAM

---

As you can see, SAM could (almost) segment anything/every things inside. But again, almost, which means, there is a big note to write here. For beautification, where we want to affects each areas differently, SAM might be okay to use. However, in industrial/medical application, using SAM for segmenting tumor/detecting PCB objects **accurately and consistently** might pose a very big questions and might need specific domain optimizations/ensemble methodologies to solve the issue, as noted in many papers, e.g. [here](https://www.nature.com/articles/s41467-024-44824-z), [here](https://arxiv.org/pdf/2307.12674), [here](https://www.sciencedirect.com/science/article/am/pii/S1361841523001780), and [here](https://openaccess.thecvf.com/content/ICCV2023W/VCL/papers/Chen_SAM-Adapter_Adapting_Segment_Anything_in_Underperformed_Scenes_ICCVW_2023_paper.pdf). However, the potentials of SAM are still undeniably huge, especially its derivation or optimization ceilings that are still yet to be explored fully. Theoretically speaking, the capability to segment cross domains without retraining is hard to get, hence why SAM is highly regarded and used in many papers extensively to do specific domain tasks with competitive results compared to highly optimized and train-from-scratch models.

Well then, how about you? do you have some use-cases that might be suitable SAM? But be aware that more optimizations might be needed in order to get industrial grade accuracy. Thanks for reading the post, have fun with SAM and happy coding!

> Hope you enjoy the post shared in here and see you in the next post~

---
