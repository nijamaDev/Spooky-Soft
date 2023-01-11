import { faker } from '@faker-js/faker';
import axios from 'axios';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

const POST_TITLES = [
  '10 Ways to Boost Your Productivity and Get More Done',
  'The Benefits of Meditation: How to Incorporate It into Your Daily Routine',
  '5 Simple Steps to Building a Successful Business',
  'How to Overcome Procrastination and Reach Your Goals',
  'The Importance of Self-Care and How to Practice It Every Day',
  'The Science Behind a Healthy Diet: What You Need to Know',
  'The Power of Positive Thinking: How to Transform Your Mindset',
  'How to Develop a Growth Mindset and Achieve Your Goals',
  'The Benefits of Regular Exercise and How to Incorporate It into Your Life',
  '10 Essential Time Management Tips for a More Balanced Life',
];

const POST_DESCS = [
  "In this post, we'll share 10 simple strategies for increasing your productivity and getting more done in less time. From setting clear goals to minimizing distractions, these tips will help you make the most of your day and achieve your goals faster.",
  "Meditation has been shown to have numerous benefits, including reducing stress, improving focus, and increasing mindfulness. In this post, we'll explain what meditation is and how to start incorporating it into your daily routine.",
  "Starting a business can be a daunting task, but with the right mindset and plan, it can be incredibly rewarding. In this post, we'll share five simple steps that you can follow to build a successful business from the ground up.",
  "Procrastination is a common problem that can hold us back from achieving our goals. In this post, we'll share some practical strategies for overcoming procrastination and making progress towards your goals.",
  "Self-care is essential for our mental, physical, and emotional well-being, but it's often something that we overlook in the hustle and bustle of daily life. In this post, we'll discuss the importance of self-care and share some simple tips for practicing it every day.",
  "A healthy diet is crucial for maintaining good health and preventing chronic diseases, but with so many different dietary recommendations out there, it can be hard to know what to eat. In this post, we'll explore the science behind a healthy diet and provide some practical tips for incorporating it into your daily routine.",
  "Our thoughts have a powerful impact on our mood, behavior, and overall well-being. In this post, we'll discuss the power of positive thinking and share some strategies for transforming your mindset and cultivating a more positive outlook on life.",
  "A growth mindset is the belief that with effort and hard work, we can improve and grow in any area of our lives. In this post, we'll explain what a growth mindset is and share some tips for developing one in order to achieve your goals.",
  "Exercise has numerous benefits for our physical and mental health, but it can be hard to make it a regular part of our routine. In this post, we'll discuss the benefits of regular exercise and share some simple tips for incorporating it into your daily life.",
  "Time management is a crucial skill for achieving balance and success in life. In this post, we'll share 10 essential time management tips that will help you prioritize your tasks, reduce stress, and achieve a better balance between work, family, and personal time.",
];

const posts = [...Array(9)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  redirect: 'https://www.example.com',

  title: POST_TITLES[index + 1],
  description: POST_DESCS[index + 1],
  createdAt: faker.date.past(),
}));

axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/news/`).then((res) => {
  console.log(res.data);
});

/*
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
*/
export default posts;
