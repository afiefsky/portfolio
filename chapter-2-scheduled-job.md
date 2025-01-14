# Scheduled Jobs in Technology: Fixed vs. Dynamic

This document is based on personal experience in the food and beverage (FnB) industry, where technology stacks often involve job schedulers. It also draws inspiration from the discussion, *"Are you still using crontab these days?"* by **Programmer Zaman Now** ([YouTube link](https://www.youtube.com/watch?v=qK9v5ZgisGc)).

## Overview
Scheduled jobs generally fall into two categories:

1. **Fixed Jobs:** Tasks executed at predefined times, such as every day at 11:00 AM or every night at 10:00 PM.  
2. **Dynamic Jobs:** Tasks triggered dynamically and executed within short intervals, such as every second, minute, or hour, depending on real-time conditions.

## Understanding Jobs in This Context
A "job" refers to a scheduled operation designed to monitor or update data when specific conditions are met.  
Examples include:
- **Payment Status Monitoring:** Verifying if a customer has completed payment for an order within a certain timeframe (e.g., 1 hour). If payment is not made, the system could mark the transaction as expired or trigger a follow-up action.

### Storage for Job-Related Data
- **Database:** Conventional systems like MySQL or NoSQL databases for permanent storage.  
- **Datastore:** In-memory databases like Redis or ElasticSearch for fast, temporary storage, typically used for transient operations.

---

## Fixed Jobs
For tasks that need to run at specific times (e.g., daily or weekly), traditional cron jobs remain an excellent solution.  

### Advantages:
- Lightweight and resource-efficient.
- Simple to configure and highly reliable for periodic execution.

### Best Use Cases:
- Generating daily reports.
- Performing nightly backups.
- Sending reminders at specific intervals.

---

## Dynamic Jobs
Dynamic jobs are better suited for operations requiring frequent checks or real-time responsiveness. Implementing them effectively often involves using a datastore like Redis or a message broker such as RabbitMQ.

### Using Redis for Dynamic Jobs
1. **Job Scheduling with Delays:**  
   Redis can store job-related data with a delay or expiration time. For example, set a payment verification job to execute 1 minute after the data is stored.

2. **Condition Checking:**
   - If the condition (e.g., payment received) is met within the delay, the job is marked complete, and the Redis entry is removed.
   - If the condition is not met, the job can be re-queued with an updated delay (e.g., an additional 15 or 30 seconds).

3. **Efficiency:**  
   This approach eliminates the need for a cron job to check the database every second. Instead, Redis's built-in delay feature handles the timing.

### Benefits of This Approach:
- Reduces the overhead of constant polling by relying on Redis’s efficient, event-driven capabilities.
- Ensures that jobs are handled dynamically based on the specific conditions and timeframes associated with each task.

### Example Use Case:
- **Payment Monitoring:** Insert a new Redis entry for each order, with a delay set to the payment timeout period. Once triggered, the job checks payment status and either completes or re-queues itself based on the results.

---

## Conclusion
- **Fixed Jobs** are well-suited for periodic tasks with a predictable schedule, and cron jobs are a reliable choice.
- **Dynamic Jobs** benefit from modern datastores like Redis, which can efficiently manage short-interval operations without the performance penalties of constant database polling.

By combining these strategies, developers can optimize job scheduling to meet various operational needs effectively.
