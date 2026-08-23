---
title: "Training lab: scoping a network compromise from packet evidence"
description: "How I used packet and flow-oriented analysis to separate routine traffic from behavior that justified deeper host investigation."
# TODO: replace with the actual completion date before publishing.
date: 2026-01-01
kind: lab
tags: ["network investigation", "traffic analysis", "incident response"]
attack: ["T1071.001", "T1041"]
tools: ["Wireshark", "Zeek", "RITA", "tcpdump"]
simulated: true
published: false
---

## Lab provenance

This write-up describes a constructed training exercise from my SEC504/GCIH studies. It contains no production traffic, customer information, or course answers.

## Objective

The goal was to turn network evidence into an investigation scope. I worked from packet and connection data, looking for patterns that could distinguish normal client behavior from command-and-control, unexpected service use, or data movement.

## Investigation approach

I began by establishing the time range and identifying the systems that communicated during it. Wireshark helped me inspect individual conversations and protocol details. Zeek converted traffic into structured records that were easier to pivot across. RITA helped surface behavioral patterns worth validating, while tcpdump provided a quick way to select and review traffic at the command line.

I treated unusual destinations, repeated timing, and protocol mismatches as hypotheses—not proof. For each lead, I asked whether the behavior could be explained by software updates, monitoring, user activity, or another routine service. I then looked for corroboration in DNS, connection, HTTP, TLS, and host evidence.

## Evidence still needed for publication

Before this draft goes live, I will add sanitized, lab-generated evidence showing:

- The starting observation and its timestamp.
- The pivot that connected the observation to a system or process.
- The protocol or timing feature that made the activity notable.
- The evidence that supported or weakened the working hypothesis.

Until those artifacts are added, the page intentionally has no evidence `chain`.

## Detection opportunities

The lab suggested detections around repeated outbound connections, unexpected protocols on common ports, rare destinations, and network behavior that changes after a suspicious host event. These signals become more useful when combined with process and identity telemetry.

## What it misses

Encrypted traffic limits payload inspection. Missing packets, asymmetric routing, network address translation, and incomplete asset context can distort conclusions. Network data may show that a connection occurred without identifying the initiating process or proving the intent behind it.

## False positives

Update services, health checks, content-delivery networks, remote administration, and poorly configured applications can resemble beaconing or unusual data transfer. Frequency alone is not enough; prevalence, destination ownership, host role, and endpoint evidence all affect the decision.

## What I took from the lab

Network analysis works best as a pivot system. One packet rarely tells the whole story. Structured metadata helps find the pattern, packet detail helps validate it, and host evidence explains which process and user produced it.


