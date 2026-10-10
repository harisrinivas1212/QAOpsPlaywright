const base = require('@playwright/test');

import{test as baseTest} from '@playwright/test';
interface testDataForOrder{
    username: string;
    password: string;
    productName: string;
}

//Here we are using interface to declare the type of the object "testDataForOrder"

export const customtest = baseTest.extend<{testDataForOrder: testDataForOrder}>(
{
testDataForOrder :    {
    username : "anshika@gmail.com",
    password : "Iamking@000",
    productName:"ADIDAS ORIGINAL"
    
    }

}

)




