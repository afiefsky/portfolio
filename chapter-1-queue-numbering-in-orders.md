# Chapter 1 - Queue Numbering in Orders: A Real-World Solution

## Table of Contents

1. [Example Case: Real-Life Queue Numbering in Orders](#example-case-real-life-queue-numbering-in-orders)
2. [Why AWS SQS + Lambda is Better](#why-aws-sqs--lambda-is-better)
3. [Problem](#problem)
4. [Solution](#solution)
   - [AWS SQS + Lambda with FIFO](#aws-sqs--lambda-with-fifo)
   - [Cron-Based Scheduler (Alternative)](#cron-based-scheduler-alternative)
5. [Recommendation](#recommendation)

---

### Example Case: Real-Life Queue Numbering in Orders

One practical example is a medical prescription transaction system, specifically for e-commerce orders related to purchasing medication. Customers can place and pay for orders at any time, whether for pickup or delivery. However, the staff preparing prescriptions require time to fulfill each order, meaning orders must be processed in a queue.

To ensure fairness, a **First-In-First-Out (FIFO)** system is used:

- The first transaction marked as "paid" is processed first.
- Subsequent transactions are processed in the order they are paid.

For example, when 100 transactions occur simultaneously, the process is significantly more efficient when handled by multiple service instances for queueing. This is why **AWS SQS with Lambda** is a superior solution compared to cron job scheduling.

---

### Why AWS SQS + Lambda is Better

1. **Separation of Concerns**:  
   AWS SQS manages the queueing of messages, while Lambda focuses solely on executing the logic based on the FIFO messages received. This separation enhances both scalability and reliability.

2. **Performance**:  
   SQS is optimized for queueing, sending messages to Lambda in FIFO order. Lambda processes the messages efficiently. In contrast, cron scripts must manage both queueing and execution in the same instance, often leading to bottlenecks and race conditions.

3. **Scalability**:  
   SQS supports a single queue instance, and Lambda automatically scales based on the incoming messages. This makes it much faster and more efficient than cron jobs, which require multiple instances to handle similar workloads.

---

### Problem

Orders marked as "paid" may not always belong to the customers who clicked the "order" button first. This can lead to issues such as:

- **Race Conditions**: When handled by a scheduler, the process is especially prone to race conditions, which increases the risk of redundancy or duplicate queue numbers.
- **Scheduler Limitations**: As the business scales and more orders are received, a single instance of the scheduler may no longer suffice, requiring multiple instances. This introduces new problems such as race conditions between instances.

Using a scheduler creates inefficiency and error-prone processes, including transaction table locks in the database.

This issue can be resolved by using AWS SQS, which is specifically designed for queueing, while offloading the task of updating queue numbers to Lambda, providing much faster performance compared to cron job schedulers.

---

### Solution

#### AWS SQS + Lambda with FIFO

Implementing **AWS SQS with Lambda using FIFO (First-In-First-Out)** ensures that queue numbers are assigned sequentially. This approach eliminates risks of duplication or redundancy, providing a consistent and reliable order process.

**Example**:

- **Person A** places an order and pays for it, receiving order number 1001.
- **Person B** places an order but delays their payment. They will not receive an order number until payment is confirmed.
- **Person C** places an order and pays immediately, receiving order number 1002 because their payment timestamp is earlier than Person B's.
- Once Person B completes their payment, they are assigned order number 1003.

This sequence ensures fairness and proper processing order.

#### Cron-Based Scheduler (Alternative)

A **cron-based scheduler** can also achieve FIFO assignment, but it requires significant effort to manipulate the scheduler to:

- Update orders
- Assign queue numbers correctly

This method demands custom logic to ensure sequential processing without introducing additional complexity.

---

### Recommendation

Leveraging **AWS SQS + Lambda with FIFO** is the preferred approach due to:

- **Simplicity**: Straightforward implementation with fewer moving parts.
- **Scalability**: Automatic scaling with Lambda and optimized queueing with SQS.
- **Performance**: Faster processing with no race conditions, and more efficient than using cron jobs.

This method is highly efficient for high-concurrency scenarios and ensures the integrity of queue number assignments.
