# My Personal Portfolio

## Description
Containing a collection of real-world cases and their practical solutions.

# Queue Number Assignment (Nomor Antrian)

## Example Case: Real-Life Queue Numbering in Orders
One practical example is a **medical prescription transaction** (e-commerce transactions specifically for purchasing medication). In this system, customers can place and pay for orders at any time, either for pickup or delivery. However, the staff preparing the prescriptions require time to fulfill each order, meaning orders must be processed in a queue. 

To ensure fairness, a **First-In-First-Out (FIFO)** system is used, where:
1. The first transaction marked as "paid" is processed first.
2. Subsequent transactions are processed in the order they are paid.

For instance, if there are 100 transactions occurring simultaneously, the processing is significantly more efficient when handled by **multiple service instances** for queueing. This is why **AWS SQS with Lambda** is a superior solution compared to cron job scheduling. 

**Why AWS SQS + Lambda is Better:**
- **Separation of Concerns:** AWS SQS handles the queueing of messages, while Lambda focuses solely on executing the logic based on the messages received in a FIFO manner. This separation enhances scalability and reliability.
- **Performance:** Since SQS is optimized for queueing, it sends messages to Lambda in FIFO order, allowing Lambda to execute the logic efficiently. In contrast, cron scripts must manage both queueing and execution within the same instance, which can lead to bottlenecks and race conditions.
- **Scalability:** SQS allows for a single queueing instance, while Lambda scales automatically based on the incoming messages, making it faster and more efficient than cron jobs, which require multiple instances to handle similar workloads.

## Problem
Orders marked as "paid" do not always belong to the customers who clicked the "order" button first.

1. When handled by a scheduler, the process is especially prone to **race conditions**, increasing the risk of redundancy or duplicate queue numbers in the orders.
2. Using a scheduler means that as the business scales and more orders are received, a single instance of the scheduler may no longer suffice. This necessitates creating multiple instances, which introduces a new problem: **race conditions** between the instances. 
3. This issue can be resolved by using **AWS SQS**, which is specifically designed for queueing. The task of updating queue numbers is then offloaded to **Lambda**, providing much faster performance compared to cron script schedulers.
4. Transaction table locks in the database create additional challenges, making the process inefficient and error-prone.

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
