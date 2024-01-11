<div align='center'>
<img width='50%' src="https://github.com/StackerDAOs/mega-dao-fe/assets/55238388/9ac8d3d4-d5b7-4599-b9d0-074ccdb571d7"  />
</div>

## local setup

- create a `.env` file with supabase url and anon key
- make sure devnet is running
- run these commands in terminal

```bash
$ pnpm install
$ pnpm dev
```

##  setup ![supabase]("https://companieslogo.com/img/orig/supabase_BIG.D-94f7cfaf.png?t=1701239800")

- create a  [supabase account]("https://supabase.com/")
- Create a new organization and project
- Go to project settings and copy the url and anon key
- Create a new table called `Proposals` with the following columns

| Column | Type | Default To |
| :--- | :--- | :--- |
| contractAddress | <kbd>text</kbd> | `null` |
| proposer | <kbd>text</kbd> | `null` |
| type | <kbd>text</kbd> | `null` |
| transactionId | <kbd>text</kbd> | `null` |
| title | <kbd>text</kbd> | `null` |
| description | <kbd>text</kbd> | `null` |
| executionDelay | <kbd>numeric</kbd> | `null` |
| startBlockHeight | <kbd>numeric</kbd> | `null` |
| endBlockHeight | <kbd>numeric</kbd> | `null` |
| submitted | <kbd>boolean</kbd> | `false` |


- create a `.env` file in the root directory and add the following

```bash
NEXT_PUBLIC_SUPABASE_URL=your supabase url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your supabase anon key
```

