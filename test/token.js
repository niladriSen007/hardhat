const {expect} = require("chai");
const { ethers } = require("hardhat");

// describe("Token contract",function (){
//     it("Deployment shold assign the total supply of tokens to the owner",async function(){
//         const [owner] = await ethers.getSigners();
//         console.log('Signers object',owner);

//         //creating insatance of contract
//         const Token = await ethers.getContractFactory("Token");

//         //deploying the contract
//         const hardhatToken = await Token.deploy();

//         const ownerBalance = await hardhatToken.chckBalance(owner.address);
//         console.log("Owner Address",owner.address)

//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance)
//     })


//     it("Shold transfer tokens between accounts",async function(){
//         const [owner,addr1,addr2] = await ethers.getSigners();
//         // console.log('Signers object',owner);

//         //creating insatance of contract
//         const Token = await ethers.getContractFactory("Token");

//         //deploying the contract
//         const hardhatToken = await Token.deploy();

//        //sending 10 tokens from to account addr1 to other
//        await hardhatToken.transfer(addr1.address,10);
//        expect(await hardhatToken.chckBalance(addr1.address)).to.equal(10)

//         //sending 5 tokens from to account addr1 to account addr2
//         await hardhatToken.connect(addr1).transfer(addr2.address,5);
//         expect(await hardhatToken.chckBalance(addr2.address)).to.equal(5);
//     })
// })


describe("Token contract",async function(){
        let Token;
        let addr1;
        let addr2;
        let hardhatToken;
        let addrs;
        let owner;

        beforeEach(async function(){
            Token = await ethers.getContractFactory("Token");
            [owner,addr1,addr2,...addrs] = await ethers.getSigners();
            hardhatToken = await Token.deploy(); 
        })

        describe("Deployment",function(){
            it("Should check the right owner",async function(){
                    expect(await hardhatToken.owner()).to.equal(owner.address);
            })
            it("Should check the assignment of tokens to the  right owner",async function(){
                const ownerBalance = await hardhatToken.chckBalance(owner.address);
                expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        })
            
        })
        describe("Transactions",function(){
            it("Should transfer tokens from one account to another",async function(){
                //from owner to address 1
                await hardhatToken.transfer(addr1.address,10)
                expect(await hardhatToken.chckBalance(addr1.address)).to.equal(10);

                //from address1 to address2
                await hardhatToken.connect(addr1).transfer(addr2.address,5)
                expect(await hardhatToken.chckBalance(addr2.address)).to.equal(5);
            })


            it("Should check if one account has not enough tokens",async function(){
                const initialBalance = await hardhatToken.chckBalance(owner.address);
                await expect( hardhatToken.connect(addr1).transfer(owner.address,5)).to.be.revertedWith("Not enough Balance");
                expect(await hardhatToken.chckBalance(owner.address)).to.equal(initialBalance);
            })

            it("Should check balance after a transaction",async function(){
                const initialBalance = await hardhatToken.chckBalance(owner.address);
                await hardhatToken.transfer(addr1.address,10)
                await hardhatToken.transfer(addr2.address,10)
                expect(await hardhatToken.chckBalance(addr1.address)).to.equal(10);
                expect(await hardhatToken.chckBalance(addr2.address)).to.equal(10);
                expect(await hardhatToken.chckBalance(owner.address)).to.equal(initialBalance - 20);
            })
        })
})