---
title: "Training lab: live Windows triage without trusting the first clue"
description: "A reflection on using native Windows telemetry and live-response tools to move from an initial symptom to a defensible investigation scope."
# TODO: replace with the actual completion date before publishing.
date: 2026-01-01
kind: lab
tags: ["incident response", "Windows", "live response"]
attack: ["T1059.001", "T1547.001"]
tools: ["PowerShell", "Sysinternals", "Windows Event Logs"]
simulated: true
published: false
---

## Lab provenance

This was a constructed training environment completed during my SEC504/GCIH studies. The systems, activity, and evidence were created for instruction. Nothing on this page comes from a production environment.

## Objective

The goal was to investigate a running Windows system while treating each artifact as a lead rather than a conclusion. I used live-response techniques to examine active processes, network activity, services, scheduled execution, and common persistence locations. The important part was not finding one suspicious item; it was correlating several independent artifacts before deciding what the system was doing.

## How I approached it

I started with volatile evidence because it can disappear when a process exits or a host is restarted. I established what was running, which processes had unusual parent-child relationships, and which programs were communicating over the network. I then moved into persistence and execution artifacts to determine whether the activity would survive a reboot and how it had started.

PowerShell gave me a repeatable way to collect and filter host information. Sysinternals tools gave me a second view of process behavior and system changes. Windows Event Logs helped place those observations on a timeline. When the sources agreed, confidence increased; when they did not, the disagreement became the next investigative question.

## Evidence model

The investigation focused on four evidence categories:

1. Process execution and parent-child relationships.
2. Active or recent network connections.
3. Services, scheduled tasks, and startup extensibility points.
4. Event records that could confirm when the activity began and which account initiated it.

Before publishing this draft, I will add sanitized screenshots or lab-generated output that supports each conclusion. I will not add a `chain` field until every step can be traced to that evidence.

## Detection opportunities

This exercise reinforced the value of detecting behavior rather than relying only on filenames. Useful detection ideas include unusual PowerShell execution, encoded or heavily obfuscated command lines, unexpected process ancestry, and changes to common persistence locations. Each signal can be benign alone, so correlation and host context matter.

## What it misses

Live response shows the state available at collection time. Short-lived processes may already be gone, logging may be incomplete, and an attacker with sufficient privilege may tamper with local evidence. Native command output also does not prove that a file is malicious. Disk, memory, centralized logs, and network telemetry may still be needed.

## False positives

Administration tools, software installers, endpoint-management agents, and legitimate automation can create many of the same process, service, and PowerShell patterns. A useful alert needs context about the account, host role, command line, signature, prevalence, and surrounding activity.

## What I took from the lab

The strongest lesson was sequencing: preserve volatile evidence, build a timeline, test competing explanations, and keep collection separate from remediation. Removing a suspicious artifact too early can destroy the evidence needed to understand scope.


