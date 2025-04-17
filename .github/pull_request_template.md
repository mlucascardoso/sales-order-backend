> [!TIP]
> ✅ Homologation pass

> [!NOTE]
> [INC0820003](https://b2rise.atlassian.net/jira/software/c/projects/SSP1/boards/77?assignee=6315f302316bbc56c42550c2&selectedIssue=SSP1-1273)


# 🧭 Overview

Remake RBlock History.

### ✅ Definition of Done

- [x] The procedure must execute successfully.

## 🧪 Test Script

> [!NOTE]
> You need to have an EVA QAS account.

1. Access the [**Database Explorer (QAS)**](https://hana-cockpit.cfapps.br10.hana.ondemand.com/hrtt/sap/hana/cst/catalog/cockpit-index.html?databaseid=C202097).

2. Open a console from the HDI container **`eva-backend (qas)`** and execute the following procedure:

```sql
CALL "EVABACKENDDB"."PROC_SEED_R_BLOCK_REPORT_HISTORY"(FULLLOAD => true);
```
![image](https://github.com/user-attachments/assets/6f0901c2-7aae-4454-8522-29869915e47d)


## 🗃 Test Data

N/A