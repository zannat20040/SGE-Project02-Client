
# Finance Management App 

This repository contains the client-side code for the Finance Management Website, a platform designed to help organizations manage their financial activities, including budgeting, expense tracking, and handling budget rollovers.


## Table of Contents

- Features
- Technologies Used
- Installation
- Environment Variables
- Documentation
- Used By
- Support


## Features

- **Budget Approval & Decline:** Submitted budgets require approval from finance. Finance can approve or decline budgets based on the requirements.

- **Create New Finance:** CEOs can create new finance & assign him to any branch.

- **Features Monthly Budget Allocation:** Finance can allocate budgets for employees each month.
- **Expense Tracking:** Employees can track their expenses against their allocated budget.
- **Budget Rollover:** Unused budget is automatically carried over to the next month.
- **Expense Limits:** Employees are prevented from exceeding their monthly budget.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Print System:** Users can generate and print reports of expenses, and other financial data for record-keeping or presentation purposes.
## Technologies Used

**Framework:** React.js 

**State Management:** Context API 

**Styling:** Tailwind CSS 

**API Handling:** Axios, Tanstack query


## Installation

Clone this repository:

```bash
  https://github.com/zannat20040/SGE-Project02-Client.git
```
    
Navigate to the project directory:

```bash
  cd SGE-Project02-Client
```
Install the necessary dependencies:
```bash
 npm install

```
Set up environment variables by creating a ``` .env ```  file in the root directory.


Now, Start the development server:
```bash
 npm run dev
```

Open your browser and navigate to ```http://localhost:5173``` to view the application.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash 
VITE_apiKey=your-api-key-here
VITE_authDomain=your-auth-domain-here
VITE_projectId=your-project-id-here
VITE_storageBucket=your-storage-bucket-here
VITE_messagingSenderId=your-messaging-sender-id-here
VITE_appId=your-app-id-here

```

**How to Collect These Variables?**

These environment variables come from your Firebase Project. **Follow these steps to retrieve them:**

- Go to the [Firebase Console](https://console.firebase.google.com/u/0/).
- Select your project or create a new one.
- Navigate to Project Settings
- Scroll down to the **Firebase SDK snippet section** and click on **Config**.
- You will find the required API keys and configuration details (e.g., apiKey, authDomain, projectId, etc.).
- Copy the values and replace the placeholders in your ```.env```  file.

Make sure not to share your ```.env``` file or any sensitive keys publicly.
## Documentation

This project uses a separate backend server to manage database operations, authentication, and other core services. You can find the backend code in the following repository:


[Finance Management Backend](https://github.com/sadmanryanriad/SGE-project02-Backend)


## Used By

This project is used by the following companies:

- [Shabuj Global Education](https://choosealicense.com/licenses/mit/)



## Support

For support, email zannatulhema0110@gmail.com .

