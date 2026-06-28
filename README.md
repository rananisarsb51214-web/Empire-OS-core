# Empire OS Core 🚀

An Autonomous Multi-Agent Orchestrator for AutoSkill AI.

## Badges

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

## Description

Empire OS Core is the deterministic, event-driven orchestration backbone for the AutoSkill AI swarm. It serves as the master kernel responsible for routing, auditing, and self-healing autonomous agents across the Empire ecosystem. It is built on a **4-Plane Observability** architecture:

1.  **Control Plane:** Intelligent task routing and agent dispatching via Orchestrator.
2.  **Execution Plane:** Specialized kernels (Finance, Health, Content) running in isolated containers.
3.  **Event Plane:** Append-only event stream providing a cryptographic audit trail.
4.  **Telemetry Plane:** Real-time metrics aggregation and heartbeat monitoring for swarm health.

## Table of Contents

-   [Project Title & Badges](#empire-os-core-%F0%9F%9A%80)
-   [Description](#description)
-   [Table of Contents](#table-of-contents)
-   [Features](#features-%E2%9C%A8)
-   [Tech Stack](#tech-stack-%F0%9F%AA%A5)
-   [Installation](#installation-%E2%9A%93%EF%B8%8F)
-   [Usage](#usage-%E2%9A%A1%EF%B8%8F)
-   [Project Structure](#project-structure-%F0%9F%97%BA%EF%B8%8F)
-   [Contributing](#contributing-%F0%9F%AA%B6)
-   [License](#license-%F0%9F%92%94)
-   [Footer](#footer-%F0%9F%A7%A0)

## Features 🌟

-   **Deterministic Routing:** Multi-agent arbitration based on task semantics.
-   **Self-Healing Kernels:** Automatic detection and reconciliation of stalled or failed processes.
-   **Merkle-State Verification:** Idempotent task handling ensures state consistency across nodes.
-   **Real-time Observability:** Live heartbeat telemetry for zero-blind-spot monitoring.
-   **Deployment Ready:** Containerized for seamless GCP Cloud Run scalability.
-   **Distributed Locking:** Implemented using Firebase Realtime Database for task coordination.
-   **Configurable Environment:** Uses Zod for environment variable validation.
-   **SFTP Integration:** Includes an SFTP adapter for file uploads and management.

## Tech Stack ⚙️

-   **Languages:** TypeScript
-   **Frameworks/Libraries:** Node.js, Turbo, ESLint, Zod, ssh2-sftp-client, uuid
-   **Infrastructure:** Firebase (Realtime Database for locking and task queues)
-   **Deployment:** Google Cloud Run (indicated by `gcloud` script)

## Installation 🛠️

### Prerequisites

-   Node.js v20+
-   Firebase Admin SDK credentials (for `*.env.local`)
-   `gcloud` CLI (for deployment)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rananisarsb51214-web/Empire-OS-core.git
    cd Empire-OS-core
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Initialize environment variables:**
    Copy the example environment file and fill in your credentials:
    ```bash
    cp .env.example .env.local
    # Add your FIREBASE_SERVICE_KEY and FIREBASE_DB_URL to .env.local
    ```
    *Note: The `.env.example` file is not provided in the analysis, but assumed based on common practice and the usage of `process.env`.* 

## Usage ⚙️

Empire OS Core acts as an orchestrator for autonomous agents. The primary entry point for the application logic appears to be `index.ts`, which initializes background processes like the `Reconciler`.

### Core Components and Their Roles:

-   **Orchestrator (`orchestrator.ts`):** Dispatches tasks to specific agents based on input and agent type. It also handles model arbitration using the `MultiModelRouter`.
-   **Agents (`agents/`):** Specialized units for specific tasks (e.g., `ContentFactoryAgent`, `SftpManager`). They process tasks and emit events.
-   **Workers (`apps/workers/`):** Handle background job processing, such as uploads, utilizing distributed locks for coordination.
-   **Reconciler (`core/reconciler.ts`):** A self-healing mechanism that runs periodically to ensure system stability.
-   **Router (`core/router.ts`):** Selects appropriate AI models for task execution, with fallback strategies.
-   **Event Bus (`core/eventBus.ts`):** Facilitates communication between different parts of the system via events (e.g., `TASK_COMPLETED`, `REVENUE_GENERATED`).
-   **Lock Manager (`core/lock-manager.ts`):** Manages distributed locks using Firebase Realtime Database to prevent race conditions in worker processes.
-   **Telemetry Processor (`core/telemetryProcessor.ts`):** Processes incoming events, such as revenue generation, and updates metrics.

### Example Workflow (Conceptual):

1.  An input is received by the **Orchestrator**.
2.  The **Orchestrator** uses the **MultiModelRouter** to select an appropriate AI model and agent.
3.  A task is created in the Firebase Realtime Database (`empire/tasks`).
4.  A **Worker** (e.g., `upload-worker.ts`) picks up the task.
5.  The **Worker** acquires a distributed lock via the **LockManager**.
6.  The **Worker** performs its task (e.g., uploading a file using an **SFTP Adapter**).
7.  Upon successful completion, the **Worker** emits a `REVENUE_GENERATED` event.
8.  The **Telemetry Processor** consumes this event to update metrics.
9.  The **LockManager** releases the lock.

### Running the Application (Development):

While the provided `package.json` has scripts for `build`, `dev`, `lint`, and `deploy:worker`, a `docker-compose.yml` is mentioned in the existing README but not provided in the analysis. Assuming a typical setup:

```bash
# Start local orchestrator stack (requires docker-compose.yml)
# docker-compose up --build 

# Or run individual services if configured
# npm run dev 
```

*Note: The exact command to run the orchestrator locally might depend on a `docker-compose.yml` file or other configuration not fully detailed in the provided code snippets.* 

### Deployment:

Deployment to Google Cloud Run is supported via the `deploy:worker` script:

```bash
# Build and deploy the worker to Google Cloud Run
npm run deploy:worker
```

## Project Structure 📁

```
empire-os-core/
├── apps/
│   └── workers/
│       └── upload-worker.ts
├── agents/
│   ├── content.ts
│   └── sftp-manager.ts
├── core/
│   ├── eventBus.ts
│   ├── events.ts
│   ├── lock-manager.ts
│   ├── reconciler.ts
│   ├── router.ts
│   └── telemetryProcessor.ts
├── packages/
│   └── uploads/
│       ├── adapter.ts
│       ├── adapter-factory.ts
│       └── sftp-adapter.ts
├── lib/
│   └── firebase-admin.ts
├── .env.example (assumed)
├── index.ts
├── LICENSE
├── package.json
└── README.md
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## License 📜

This project is licensed under the **Apache License 2.0**. See the `LICENSE` file for more details.

## Footer 🌳

© 2024 **Empire OS Core**

-   **Repository:** [Empire-OS-core](https://github.com/rananisarsb51214-web/Empire-OS-core)
-   **Author:** rananisarsb51214-web

Star ⭐ | Fork 🍴 | Watch 👀 | Issue 🐞


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**