<div align='center'>
<img width='50%' src="https://github.com/StackerDAOs/mega-dao-fe/assets/55238388/9ac8d3d4-d5b7-4599-b9d0-074ccdb571d7"  />
</div>

## ➡️ Development setup

- create a `.env` file with supabase url and anon key
- make sure devnet is running
- run these commands in terminal

```bash
$ pnpm install
$ pnpm dev
```

## ➡️ Database setup

- create a <img src="https://github.com/StackerDAOs/mega-dao-fe/assets/55238388/4c0d77b6-289e-4b11-b777-2274ed05bb2d" alt="supabase" width="80"/> [account](https://supabase.com)
- Create a new organization and project
- Go to project settings and copy the url and anon key
- Create a new table called **Proposals** (P capital) with the following columns

| Column | Type | Default To | Notes
| :--- | :--- | :--- | :--- |
| created_at | <kbd>text</kbd> | `null` | `Change the existing supabase column to all lower snake case` |
| contractAddress | <kbd>text</kbd> | `null` | `Stores the contract address of the proposal contract` |
| proposer | <kbd>text</kbd> | `null` | `Stores the principal of the proposer` |
| type | <kbd>text</kbd> | `null` | `Type of proposal (for future extension page)` |
| transactionId | <kbd>text</kbd> | `null` | `Stores the transaction hash` |
| title | <kbd>text</kbd> | `null` | `Title of the proposal` |
| description | <kbd>text</kbd> | `null` | `Description of the proposal` |
| executionDelay | <kbd>numeric</kbd> | `null` | `Delay to execute a proposal in block heights` |
| startBlockHeight | <kbd>numeric</kbd> | `null` | `Starting block height of the proposal` |
| endBlockHeight | <kbd>numeric</kbd> | `null` | `Ending block height of the proposal` |
| submitted | <kbd>boolean</kbd> | `false` | `Status of submission` |
| concluded | <kbd>boolean</kbd> | `false` | `If the proposal was concluded or not` |
| disabled | <kbd>boolean</kbd> | `false` | `status of submission` |
| votesFor | <kbd>numeric</kbd> | `null` | `Number of for votes ` |
| votesAgainst | <kbd>numeric</kbd> | `null` | `Number of against votes` |


- create a `.env` file in the root directory and add the following

```bash
NEXT_PUBLIC_SUPABASE_URL=your supabase url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your supabase anon key
```

## 🧪 Tests analysis

| User Stories | Expected Behaviour | Current Behaviour Status
| :--- | :--- | :--- | 
| A user with 0 MEGA balance should not be allowed to propose | User blocked / redirected with a appropriate toast message  | 🟩 | 
| Header shows user balance | Main header should show vault STX balance, total proposals and MEGA balance of user | 🟩 |
| Deposit option for admin | Admin can deposit STX to vault from UI | 🟩 |
| Fetch balance on account switch | The user balance should refetch if account switched | 🟩 |
| State management for smart contract code | Smart contract code value should not change during the creation 4 step process | 🟩 |
| User should be able to deploy contract | Proper loading and deployment status information (success & failure) | 🟩 |
| Contract proposal | Update DB proposal to submitted once on-chain function is called to propose | 🟩 |
| Proposal Card | card UI to show status of proposal | 🟩 |
| Vault Page | a vault page to list all the assets holding | 🟩 |
| Proposal Page | user should be able to vote to ✅  /  ❎  with a table containing proposal information such as `vote start` `vote end`  | 🟩 |
| Proposal conclude status | user should be able to know if the proposal was passed or rejected by the DAO | 🟩 |
| Proposal to transfer STX | full flow of test proposal to transfer STX from vault to a recipient | 🟩 |
| Proper proposal management in DB | edge should be handled if deployment fails | 🟨 |
| Proper transaction status | user should get status of their submitted transaction | 🟨 |
| Delegation | governance with delegation | 🟥 |
| Governance page | a dedicated page for governance where user can add their delegates | 🟥 |
| Extensions page | a dedicated page for managing extensions more effectively and treat proposals different from extension proposal | 🟥 |
| Migration to using ⛓️ chainhook service | migration to chainhook service for more accurate blockchain data | 🟥 |

## Reference 

#### 🟩  refers to test cases which works as expected 
#### 🟨  refers to test cases that works but are prone to errors and edge cases which can be solved using chainhook service in future
#### 🟥  refers to test cases that has not been conducted and does not include in this version of Dapp


## Screenshots 

<img width="1433" alt="Screenshot 2024-01-11 at 1 55 42 PM" src="https://github.com/StackerDAOs/mega-dao-fe/assets/55238388/54c91d18-f50a-4e12-b0b6-f2e95501a945"> <br />

<img width="1433" alt="Screenshot 2024-01-11 at 1 55 28 PM" src="https://github.com/StackerDAOs/mega-dao-fe/assets/55238388/cfdd346b-5a1b-4bee-bbad-c59f69252d19">



