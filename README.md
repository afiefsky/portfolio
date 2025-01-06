# My Personal Portfolio

## Description
Containing a collection of real-world cases and their practical solutions.

# Queue Number Assignment (Nomor Antrian)

## Example Queue Numbers
1001, 1002, 1003, 1004, and so on.

## Problem
Orders marked as "paid" do not always belong to the customers who clicked the "order" button first.

1. When handled by a scheduler, the process is especially prone to **race conditions**, increasing the risk of redundancy or duplicate queue numbers in the orders.
2. Transaction table locks in the database create additional challenges, making the process inefficient and error-prone.

## Solution

### 1. AWS SQS + Lambda with FIFO
Implementing **AWS SQS** with **Lambda** using the **FIFO (First-In-First-Out)** concept ensures queue numbers are assigned sequentially. This approach eliminates risks of duplication or redundancy and provides a consistent, reliable order process.

### 2. Cron-Based Scheduler (Alternative)
A **cron-based scheduler** can also achieve FIFO assignment, but it requires significant effort to manipulate the scheduler to:
- Update orders and
- Assign queue numbers correctly.

This approach demands custom logic to ensure sequential processing without introducing additional complexity.

## Recommendation
Leveraging **AWS SQS + Lambda with FIFO** is the preferred approach due to its simplicity, scalability, and ability to handle high-concurrency scenarios while maintaining the integrity of queue number assignments.
