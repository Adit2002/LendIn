// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanContract {
    address public sender;
    address public receiver;
    uint public principal;
    uint public interestRate; // Annual interest rate in percentage (e.g., 5 for 5%)
    uint public months;
    uint public remainingAmount;

    constructor(
        address _sender,
        address _receiver,
        uint _principal,
        uint _interestRate,
        uint _months
    ) {
        sender = _sender;
        receiver = _receiver;
        principal = _principal;
        interestRate = _interestRate;
        months = _months;
        remainingAmount = principal + calculateInterest();
    }

    function calculateInterest() public view returns (uint) {
        // Simple interest calculation: Principal * InterestRate * Months / 12
        return (principal * interestRate * months) / (100 * 12);
    }

    function getTotalAmount() public view returns (uint) {
        return principal + calculateInterest();
    }

    function transfer() public {
        // Ensure that the sender is the one invoking this function
        require(msg.sender == sender, "Only sender can initiate transfer");

        // Transfer funds from sender to receiver
        payable(receiver).transfer(remainingAmount);
    }

    function repay() public payable {
        // Ensure that the receiver is the one invoking this function
        require(msg.sender == receiver, "Only receiver can repay");

        // Ensure that the repayment amount is sufficient
        require(msg.value >= remainingAmount, "Insufficient repayment amount");

        // Transfer funds from receiver to sender
        payable(sender).transfer(msg.value);

        // Update remaining amount
        remainingAmount = 0;
    }
}
