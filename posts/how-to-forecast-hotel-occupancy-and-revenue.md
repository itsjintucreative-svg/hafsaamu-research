---
title: "How to Forecast Hotel Occupancy and Revenue Using Your Own Data"
image: "/media/hotel-occupancy-forecasting.jpg"
date: "November 11, 2026"
category: "Hotel Research"
author: "Phinu"
excerpt: "A practical guide for small and independent hotels, with simple methods, formulas and a 30-day forecasting plan."
---

A practical guide for small and independent hotels, with simple methods, formulas and a 30-day plan.
SEO details (remove before publishing)
• Target keyword: hotel occupancy forecasting
• Secondary keywords: hotel revenue forecasting, how to forecast hotel occupancy, small hotel forecasting, RevPAR formula, hotel forecasting in Excel
• Title tag (under 60 characters): Hotel Occupancy Forecasting: A Practical Guide (2026)
• Meta description (under 160 characters): Learn how small hotels can forecast occupancy and revenue from their own records. Simple methods, formulas, a worked example and a 30-day plan.
• URL slug: /hotel-occupancy-forecasting-guide
• Image alt text ideas: "hotel occupancy forecast chart", "RevPAR formula example", "daily hotel records in a spreadsheet"
Ask a hotel owner what next month will look like and you usually get one of two answers. "Should be okay, it’s the wedding season." Or a long pause, followed by "let me check with the front desk."
Neither answer is wrong. But neither is something you can plan staff, purchases or pricing around.
The good news is that you don’t need a revenue management team to do better. If you have even a year of daily records, you already own the raw material for a useful forecast. This guide shows you how to turn it into one, step by step, in plain language.
What is hotel occupancy forecasting?
Hotel occupancy forecasting is the practice of estimating how many of your rooms will be sold on a future date or period, using past data and current bookings. A revenue forecast goes one step further and estimates how much money those rooms will bring in. Both are estimates, not promises. Their job is to make your planning less of a guess.
The three numbers every forecast is built on
Before forecasting anything, make sure you’re measuring the same things every day. Three numbers do most of the work.
Occupancy rate is the share of your available rooms that were sold.
\text{Occupancy} = \frac{\text{Rooms sold}}{\text{Rooms available}} \times 100
ADR (average daily rate) is the average price you got for each room sold.
\text{ADR} = \frac{\text{Room revenue}}{\text{Rooms sold}}
RevPAR (revenue per available room) shows how well you earn from every room you have, sold or not.
\text{RevPAR} = \frac{\text{Room revenue}}{\text{Rooms available}} = \text{Occupancy} \times \text{ADR}
Here is a quick example. Say you run a 40-room hotel. Last night you sold 28 rooms and earned ₹98,000 in room revenue.
Metric
Calculation
Result
Occupancy
28 ÷ 40
70%
ADR
₹98,000 ÷ 28
₹3,500
RevPAR
₹98,000 ÷ 40
₹2,450
Why this matters: a hotel can be 90% full at a very low rate and still earn less than a hotel that is 65% full at a good rate. Occupancy alone never tells the whole story, so track all three.
What data do you need?
You don’t need a fancy system. You need consistent daily records. Here is the minimum, and what each field is used for.
Field
Why it matters
Date
The base of every pattern
Rooms available
Changes when rooms are blocked for repairs
Rooms sold
Gives you occupancy
Room revenue
Gives you ADR and RevPAR
Booking source (walk-in, OTA, direct, corporate)
Shows where demand really comes from
Notes on special days (festival, wedding, local event)
Explains spikes you’d otherwise forget
How much history is enough? As a rule of thumb, twelve months is the minimum for spotting a yearly pattern, and two years is better because you can compare the same season twice. A single season of data can tell you about last month. It can’t tell you what next Diwali will look like.
One warning before you start: clean data beats clever methods. If rooms sold is recorded differently on different days, or revenue includes food some days and not others, fix that first.
Method 1: Same period last year, adjusted for the trend
This is the simplest method and it works better than most people expect.
1. Find your occupancy for the same period last year.
2. Check how this year’s bookings are running compared to the same point last year.
3. Adjust last year’s number up or down by that difference.
Example: last March your average occupancy was 62%. This year, bookings for March are running about 8% ahead of where they were at the same time last year. Your estimate is about 62% × 1.08, which is roughly 67%.
The weakness: it assumes this year behaves like last year. A festival that moved dates, a new road or a new competitor can break that assumption.
Method 2: Day-of-week averages
Most hotels have a weekly rhythm. Business hotels are fuller midweek. Leisure hotels peak on Fridays and Saturdays. Take the last 8 to 12 weeks and calculate your average occupancy for each weekday.
Day
Average occupancy (example)
Monday
48%
Tuesday
45%
Wednesday
52%
Thursday
58%
Friday
74%
Saturday
81%
Sunday
63%
Now you have a baseline for any ordinary week. Add your known special days on top, such as a wedding block or a local festival. This method is quick, and it quietly fixes the common mistake of treating every day as the same.
Method 3: Booking pace (pickup)
Pace tells you how fast rooms are being booked for a future date, compared with how fast they usually are.
Suppose your records show that, 14 days before arrival, you typically already have about 60% of the rooms you’ll finally sell. Today, for a date 14 days away, you have 24 rooms booked in a 50-room hotel.
\text{Expected rooms sold} = \frac{24}{0.60} = 40 \quad \Rightarrow \quad \text{Occupancy} \approx 80\%
Pace works best when most of your business comes through advance bookings. If you depend heavily on walk-ins, it will understate your final number, so use it together with Method 2.
Method 4: Machine learning on your historical data
Machine learning sounds like a big step, but the idea is simple. Instead of you picking the pattern ("Fridays are strong", "March is slow"), a model looks through your past records and finds patterns on its own, then uses them to estimate future dates.
It needs the same kind of data as the methods above: dates, rooms sold, revenue. It can also pick up combinations that are hard to see by eye, such as a weekday that is strong only in certain months.
A few honest limits:
• A model only knows what is in your data. If you never recorded a local festival, it can’t learn the festival effect.
• It needs enough history. With only a few weeks of data, a simple average will often do better.
• It can be wrong. Treat the output as an estimate, then compare it with your own judgment and with Methods 1 to 3.
• It doesn’t make decisions. It gives you a number to think with.
If you or someone on your team works in Python, libraries like scikit-learn make this approachable. The important rule is to test the model on time it has never seen. Train it on the older months, then check its forecasts against the most recent months. Never test on the same data you trained on, because that flatters the model.
How to measure whether your forecast is any good
A forecast you never check is just an opinion. Each week, compare what you predicted with what really happened.
Two simple measures:
• Absolute error: the gap between forecast and actual. If you forecast 70% and got 64%, the error is 6 percentage points.
• MAPE (mean absolute percentage error): the average of those gaps as a percentage of the actual value.
\text{MAPE} = \frac{1}{n} \sum \left| \frac{\text{Actual} - \text{Forecast}}{\text{Actual}} \right| \times 100
Don’t chase a perfect score. What you want to see is the error shrinking over time, and a forecast that is better than your old guess. If your simple day-of-week average beats a complicated model, use the simple average.
Common mistakes small hotels make
1. Forecasting from too little data. One season is not a pattern.
2. Ignoring blocked rooms. If 5 rooms are under repair, your rooms available changed. Occupancy looks wrong if you still divide by the full count.
3. Mixing revenue types. Keep room revenue separate from food and other income.
4. Not recording special events. Without notes, a spike last year looks like a mystery this year.
5. Trusting one method. Compare two or three. When they agree, you can be more confident. When they disagree, that is a signal to look closer.
6. Treating the forecast as a promise. It is a planning tool. It will be wrong sometimes, and that is normal.
Spreadsheet, cloud software or a local tool?
There is no single right answer. It depends on your size, budget and how you feel about where your data lives.
Option
Good for
Watch out for
Spreadsheet (Excel, Google Sheets)
Starting out, Methods 1 to 3, no extra cost
Manual work, easy to break formulas, hard to scale
Cloud revenue management software
Larger properties that want automation and live market data
Monthly cost, data stored on someone else’s servers
Local-first forecasting app
Owners who want forecasts without sending data online
Depends on the quality and amount of your own records
Full disclosure: I’m building a tool of the third kind, called Hafsaamu Hotelix. It’s a Windows app where you enter daily records or import a CSV, then train a forecasting model on your own history, with the data stored on your own computer. It’s in Public Beta. I’ve written this guide so it’s useful whichever option you pick, including a plain spreadsheet.
A 30-day plan to start forecasting
1. Days 1 to 5: Gather your last 12 to 24 months of records. Put them in one table with the same columns for every day.
2. Days 6 to 10: Clean the data. Fix missing days, blocked rooms and mixed revenue types.
3. Days 11 to 15: Calculate occupancy, ADR and RevPAR for each month. Note your busiest and slowest periods.
4. Days 16 to 20: Build the day-of-week averages (Method 2) and a same-period-last-year estimate (Method 1) for the next 30 days.
5. Days 21 to 25: Add pace (Method 3) for dates already on the books.
6. Days 26 to 30: Compare forecasts with real results and write down the errors. Decide whether you want to try a machine learning tool next.
Frequently asked questions
How accurate can a hotel forecast be? It depends on your data and how stable your business is. Hotels with steady, advance-booked demand usually forecast more accurately than those that depend on walk-ins and events. Track your own error and aim to improve it over time.
How far ahead should I forecast? Most small hotels get the most value from forecasts for the next 30 days (for staffing and purchasing) and the next 90 days (for pricing and promotions). Longer than that, treat the number as a rough direction.
Can I forecast hotel occupancy in Excel? Yes. Day-of-week averages, same-period-last-year adjustments and simple pace calculations all work well in a spreadsheet.
Do I need machine learning to forecast? No. Simple methods are a solid start. Machine learning becomes useful when you have a lot of clean history and want to find patterns that are hard to spot manually.
What is a good occupancy rate for a small hotel? There is no universal number. It varies by city, season and hotel type. Compare yourself with your own past and with similar hotels near you, and look at RevPAR as well as occupancy.
How much data do I need? At least 12 months is a good minimum. Two years or more lets you see seasonal patterns properly.
Final thoughts
Forecasting is not about predicting the future perfectly. It’s about walking into next month with a better estimate than "it should be fine." Start with the numbers you already have, pick one simple method, check it against reality every week, and improve from there.
Your records are the most useful dataset about your hotel, and you are the only one who has them. Use them.