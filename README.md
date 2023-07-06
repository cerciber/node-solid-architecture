# node-solid-architecture
Solid architecture for Node.js implementing Clean Architecture. Node.js.
- frameworks: This layer contains the frameworks, drivers and external tools used in the application.
- adapters: This layer receive requests from framework layer and translate them into calls to the corresponding application use cases.
- application: This layer contains the use cases o the business logic workflows.
- entities: This layer contains the conceptual representations objects of the domain and its business logic.
- utils: Store files and utility functions that do not belong to a specific layer of the architecture.

# GitHub Management Flow
1. Create issue
1. Make issue assignment
2. Create branch from develop
3. Solve issue
4. Create Pull Request to develop (With issue and people assignment)
5. Make code review
6. Merge into develop
7. Create Pull Request to master (With issue and people assignment)
8. Make code review
9. Merge into master
10. Create tag from master
11. Create release
