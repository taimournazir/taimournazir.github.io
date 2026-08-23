---
title: "Training lab: analyzing password attacks as an identity incident"
description: "A defender-focused review of password guessing and offline cracking, centered on evidence, scope, and control improvement."
# TODO: replace with the actual completion date before publishing.
date: 2026-01-01
kind: lab
tags: ["identity", "password attacks", "incident response"]
attack: ["T1110", "T1110.002", "T1110.003"]
tools: ["Legba", "Hashcat", "John the Ripper", "Authentication logs"]
simulated: true
published: false
---

## Lab provenance

This was an authorized, constructed training lab completed during my SEC504/GCIH studies. The objective was to understand attacker tradecraft so I could investigate and detect it defensively. No real accounts or production credentials were used.

## Objective

The exercise covered two related but different problems: online password guessing against an authentication service and offline password recovery from captured hashes. I focused on the evidence each method creates, the controls that can slow it down, and the questions an analyst should ask before declaring an account compromised.

## Attacker behavior and defender evidence

Online guessing creates authentication activity at the target. Depending on the method, an analyst may see many attempts against one account, a smaller number across many accounts, or distributed attempts that remain below simple thresholds. Offline cracking happens away from the authentication system, so the cracking itself does not create target-side login events. The defensive priority becomes preventing hash theft, protecting weak passwords, and detecting how credential material was accessed.

Using password-auditing tools made the difference concrete. The tool output could show that a lab password was recoverable, but that alone did not show that the same password had been used successfully against a service. Authentication evidence was still required to establish account use.

## Investigation workflow

1. Identify the authentication service, affected accounts, and available log sources.
2. Separate failures, successes, lockouts, and changes in source behavior.
3. Check whether a success followed the guessing activity and whether post-authentication behavior was unusual.
4. Expand scope to other accounts and systems without assuming every failure came from the same cause.
5. Preserve the distinction between attempted access and confirmed access.

## Evidence still needed for publication

I will add sanitized lab evidence for the authentication pattern and any successful follow-on activity before publishing. A final `chain` will only be added if every step and figure is visible in the body.

## Detection opportunities

Single-account thresholds catch only part of the problem. Better coverage correlates failures across accounts, source addresses, devices, time windows, and authentication services. A successful login following a suspicious pattern should increase priority, especially when the account or device context also changes.

## What it misses

Authentication logs may not reveal offline cracking, attempts against an unmonitored service, or distributed activity that stays below thresholds. Shared address space, incomplete identity context, and inconsistent logging can also hide the true source and scope.

## False positives

Expired passwords, stale service credentials, mapped drives, mobile clients, vulnerability scanners, and user mistakes can generate repeated failures. Detection logic needs exclusions that are documented and periodically reviewed rather than broad suppression.

## What I took from the lab

The main lesson was to use precise language. Password guessing, password spraying, hash cracking, account compromise, and account use are not interchangeable conclusions. Each requires different evidence.


