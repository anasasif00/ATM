import inquirer from 'inquirer';
import chalk from 'chalk';

async function main(){
    interface ansType{
        userId: string,
        userPin: number,
        accountType: string,
        transactionType: string,
        amount: number,
    }
    
    
    const answer:ansType = await inquirer.prompt([
        {
            type: "input",
            name: "userId",
            message: chalk.bgYellow.bold("Kindly enter your ID")
        },
        {
            type: "number",
            name: "userPin",
            message:chalk.bgRed( "Kindly enter your four digit pin(XXXX) : ")
        },
        {
            type:"list",
            name: "accountType",
            choices:['Saving Account' , 'Current Account'],
            message:"Select account type here"
        },
        {
            type:"list",
            name: "transactionType",
            choices:['Fast Cash' , 'Withdrawal' , 'Balance Inquiry'],
            message: chalk.green("Select transaction type here"),
            when(answer) {
                return answer.accountType
            },
        },
        {
            type:"list",
            name: "amount",
            choices:[1000 , 2000 , 5000 , 10000],
            message:"Select your amount",
            when(answer) {
                return answer.transactionType == 'Fast Cash'
            },
        },
        {
            type:"number",
            name: "amount",
            message:chalk.greenBright("Enter your amount between Pkr 500- Pkr 50,000"),
            when(answer) {
                return answer.transactionType == 'Withdrawal'
            },
        }
    ]);
    
    
    if (answer.userId && answer.userPin){
    
        const balance = Math.round(Math.random()*10000000)
        console.log(balance);
    
         const enteredAmount = answer.amount;
         if (balance >= enteredAmount){
          const remainingBalance =  balance - enteredAmount;
          console.log(`Your remaning balance is ${remainingBalance}`)
         }else{
            console.log("Insufficient Balance")
         }
    } 
    
    }
    
    
    
    
    async function startAgain() {
        do {
            await main();
            var answer = await inquirer
                .prompt({
                    type: "input",
                    name: "restart",
                    message: "Do You Want To Continue Press y or n ?",
                })
        } while (answer.restart == 'y' || answer.restart == 'yes' || answer.restart == 'Y' || answer.restart == 'YES')
      };
      
      startAgain();