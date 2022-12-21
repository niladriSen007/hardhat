//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 import "../node_modules/hardhat/console.sol";

contract Token
{
    string public name="Hardhat Token";
    string public symbol = "HHT";
    uint public totalSupply = 100;

    address public owner;

    mapping(address=>uint) balances;

    //this means that the owner will have all the tokens in his account at the first stage then he can transfer anyone 
    constructor()
    {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external {
        console.log("---------sender is sending %s tokens to %s----------",amount,to);
        require(balances[msg.sender] >= amount,"Not enough Balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function chckBalance(address account) external view returns(uint) {
        return balances[account];
    }
    }