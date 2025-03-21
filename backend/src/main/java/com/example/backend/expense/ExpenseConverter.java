package com.example.backend.expense;

import com.example.expense.oas.api.ExpenseApi;

public class ExpenseConverter {

    public com.example.backend.expense.Expense getDatabase(com.example.expense.oas.model.Expense expense) {
        return com.example.backend.expense.Expense.builder()
                .id(expense.getId())
                .title(expense.getTitle())
                .amount(expense.getAmount())
                .username(expense.getUsername())
                .build();
    }

    public com.example.expense.oas.model.Expense getResponse(Expense expense) {
        return com.example.expense.oas.model.Expense.builder()
                .id(expense.getId())
                .title(expense.getTitle())
                .amount(expense.getAmount())
                .username(expense.getUsername())
                .build();
    }
}
