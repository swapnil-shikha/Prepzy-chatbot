import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

export const Message=async(req,res)=>{
   try {
    const {text}=req.body;
 
    if(!text?.trim()){
        return res.status(400).json({error:"Text cannot be empty"});
    }

    const user=await User.create({
        sender:"user",
        text
    })

    // Data
    const botResponses=
        {
            "hello": "Hi! How can I help you prepare for your interview today?",
            "can we become friends": "Of course! I’m here to help you anytime.",
            "how are you": "I’m just a bot, but I’m ready to help you ace your interview!",
            "what is your name?": "I’m InterviewBot, your virtual interview assistant.",
            "who made you": "I was created to help B.Tech CSE students prepare for interviews.",
            "tell me a joke": "Why do programmers prefer dark mode? Because light attracts bugs!",
            "what is the time": "I don’t have a watch, but your system should have the current time.",
            "bye": "Goodbye! Keep practicing and good luck!",
            "thank you": "You’re welcome! Keep up the preparation.",
            "i love you": "I’m here to help you succeed, that’s my purpose!",
            "where are you from": "I live in the cloud, accessible anytime you need.",
            "what can you do": "I can help you answer technical and HR questions, explain concepts, and give interview tips.",
          
            "what is data structure": "Data Structure is a way of organizing and storing data efficiently.\n• Common types: Arrays, Linked List, Stack, Queue, Trees, Graphs, Hash Tables\n• Used to solve problems efficiently with optimized memory and time complexity\n• Example in interview: Implement a stack using arrays or linked list",
          
            "what is algorithm": "An algorithm is a step-by-step procedure to solve a problem.\n• Should be correct, finite, and efficient\n• Types: Sorting, Searching, Graph, Dynamic Programming, Greedy, Divide & Conquer\n• Example in interview: 'Explain QuickSort or Binary Search algorithm'",
          
            "what is oop": "Object-Oriented Programming (OOP) is a programming paradigm based on objects.\n• Key concepts: Class, Object, Inheritance, Polymorphism, Encapsulation, Abstraction\n• Example: Java and C++ use OOP to model real-world entities",
          
            "what is recursion": "Recursion is a technique where a function calls itself to solve smaller subproblems.\n• Requires a base condition to prevent infinite calls\n• Used in tree traversal, factorial, Fibonacci sequence, and coding interview questions",
          
            "explain stack": "Stack is a linear data structure that follows LIFO (Last In First Out).\n• Operations: push (insert), pop (delete), peek (top element)\n• Used in expression evaluation, recursion, undo mechanisms in software",
          
            "explain queue": "Queue is a linear data structure that follows FIFO (First In First Out).\n• Types: Simple Queue, Circular Queue, Priority Queue, Deque\n• Applications: CPU scheduling, printer task scheduling",
          
            "what is linked list": "A linked list is a linear data structure where elements are nodes connected using pointers.\n• Types: Singly, Doubly, Circular Linked List\n• Advantages: Dynamic size, easy insertion/deletion\n• Used in implementation of stacks, queues, and adjacency lists",
          
            "what is binary tree": "A binary tree is a tree data structure where each node has at most two children.\n• Types: Full, Complete, Perfect, Balanced, Binary Search Tree (BST)\n• Used in searching, sorting, expression parsing, and hierarchical data",
          
            "what is dbms": "DBMS (Database Management System) is software to store, manage, and retrieve data.\n• Types: Relational (MySQL, Oracle), NoSQL (MongoDB)\n• Key concepts: Tables, Queries, Normalization, Transactions, ACID properties",
          
            "what is sql": "SQL (Structured Query Language) is used to interact with relational databases.\n• Operations: SELECT, INSERT, UPDATE, DELETE, JOIN, GROUP BY\n• Used in database management, reporting, and backend development",
          
            "what is os": "Operating System is system software that manages computer hardware and software resources.\n• Key functions: Process management, Memory management, File systems, Device management\n• Examples: Windows, Linux, MacOS",
          
            "what is process": "A process is a program in execution.\n• Has PID, state, program counter, memory, and resources\n• Concepts: Multitasking, Process Scheduling, Context Switching",
          
            "what is thread": "Thread is the smallest unit of execution within a process.\n• Types: User threads, Kernel threads\n• Advantage: Lightweight, faster context switching, shared memory",
          
            "what is networking": "Computer Networking is connecting computers to share resources and data.\n• Key concepts: OSI & TCP/IP model, IP, MAC, DNS, Routing, Switching\n• Protocols: HTTP, FTP, TCP, UDP",
          
            "what is dsa": "DSA (Data Structures & Algorithms) helps in solving computational problems efficiently.\n• Core concepts: Arrays, Linked Lists, Trees, Graphs, Sorting, Searching, Recursion, DP\n• Used heavily in coding interviews",
          
            "what is compiler": "Compiler is a program that converts high-level code into machine code.\n• Phases: Lexical analysis, Syntax analysis, Semantic analysis, Optimization, Code generation\n• Example: GCC for C/C++",
          
            "what is software engineering": "Software Engineering is the systematic application of engineering principles to software development.\n• Models: Waterfall, Agile, Spiral, V-Model\n• Key practices: Requirement analysis, Design, Implementation, Testing, Maintenance",
          
            "tell me about yourself": "Start with your introduction, highlight technical skills, projects, internships, and conclude with enthusiasm for the role.\nExample: 'I am a B.Tech CSE student skilled in Python and SQL. I completed an internship at XYZ where I optimized database queries. I’m passionate about problem-solving and eager to contribute to your team.'",
          
            "why should we hire you": "Focus on your skills, achievements, and how you match the job requirements.\nExample: 'I bring strong coding skills, problem-solving ability, and quick learning. I have proven experience through projects and hackathons, and I’m confident I can add value to your team.'",
          
            "what is leadership": "Leadership is the ability to guide a team to achieve goals.\n• Traits: Communication, Accountability, Decision-making, Vision\n• Example: Led a college project team to complete a project before deadline",
          
            "what is cloud computing": "Cloud Computing provides on-demand computing resources over the internet.\n• Types: IaaS, PaaS, SaaS\n• Examples: AWS, Azure, Google Cloud\n• Used in scalable web apps, data storage, and AI services",
          
            "what is ai": "AI (Artificial Intelligence) is simulating human intelligence in machines.\n• Subfields: Machine Learning, NLP, Computer Vision, Robotics\n• Applications: Chatbots, Recommendation systems, Autonomous vehicles",
          
            "what is ml": "Machine Learning is a subset of AI where systems learn from data.\n• Types: Supervised, Unsupervised, Reinforcement learning\n• Example: Spam detection, Image recognition",
          
            "what is python?": "Python is a high-level programming language known for simplicity and versatility.\n• Easy syntax, dynamically typed, supports OOP, functional and procedural paradigms\n• Applications: Web development, AI, data science, automation",
          
            "what is java?" :"Java is an object-oriented, platform-independent programming language.\n• 'Write Once, Run Anywhere' via JVM\n• Used in enterprise systems, Android apps, cloud applications"
          }
          

const normalizedText = text.toLowerCase().trim();

const botResponse = botResponses[normalizedText] || "Sorry, I don't understand that!!!";

const bot = await Bot.create({
    text: botResponse
})

return res.status(200).json({
    userMessage:user.text,
    botMessage:bot.text,
})
   } catch (error) {
    console.log("Error in Message Controller:", error);
    return res.status(500).json({error:"Internal Server Error"});
   }
}