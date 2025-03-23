# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.

## Debug mode sales-order-backend-service

- cf enable-ssh sales-order-backend-service
- cf restart sales-order-backend-service

- cf ssh sales-order-backend-service
- ps aux | grep node
- kill -usr1 <PID> # enables the debug mode
- ctrl + D
- cf ssh -N -L 9229:127.0.0.1:9229 sales-order-backend-service
- Access chrome://inspect
- Access sources tab