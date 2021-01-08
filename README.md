A CLI expense tracking npm package

## Todo:

- [ ] Allow user to manage multiple budgets
- [ ] Must use app daily (Node on iOS possible through ish-app/ish)
- [ ] Add TS, Redux, immer or ImmutableJS, tests (code kata)
- [ ] Fork project, hook up Firebase, migrate to mobile React Native app

Places we deal with store object:
1. reading file on app bootstrap
2. displaying budget on main() prompt
3. mutating store budget on insertNewCharge()
4. mutating store charges on insertNewCharge()
5. mutating store budget on editBudget()

## Edge Cases
- If a user edits a budget, should we purge it's charges?
  - If we don't, sum of all charges won't equal budget.

## State flow diagram
```
stateDiagram-v2
    [*] --> hasOnboarded?
    hasOnboarded? --> persistOffline
    persistOffline --> isOnboarding
    [*] --> prompt1
    prompt1 --> editBudget
    prompt1 --> addExpense
    editBudget --> [*]
    addExpense --> [*]
    addExpense --> prompt2
    prompt2 --> selectCategory
    selectCategory --> addExpense
  ```