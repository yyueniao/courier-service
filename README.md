# Courier Service Challenge

A production-ready CLI application designed to estimate delivery costs and optimize shipment schedules for a courier service. This project was built with a focus on **SOLID principles**, **Test-Driven Development (TDD)**.

## 🚀 Getting Started

### Prerequisites

- `Node.js` (Latest LTS recommended)
- `pnpm` (Package manager used for this project)

### Setup & Installation

```bash
# Install dependencies
pnpm install

# Build the project (TypeScript to JavaScript)
pnpm build
```

### Running the CLI

The application uses library [`commander`](https://github.com/tj/commander.js/) to provide a structured CLI experience.

```bash
# Calculate Delivery Cost
pnpm cli delivery-cost <baseDeliveryCost> <numberOfPackages>

# Calculate Delivery Time (Optimized Shipments)
pnpm cli delivery-time <baseDeliveryCost> <numberOfPackages>
```

#### Example Usage:

```bash
 pnpm cli delivery-time 100 5

--- Starting Input for 5 Packages ---
Please input package 1 Info:
PKG1 50 30 OFR001
Please input package 2 Info:
PKG2 75 125 OFR008
Please input package 3 Info:
PKG3 175 100 OFR003
Please input package 4 Info:
PKG4 110 60 OFR002
Please input package 5 Info:
PKG5 155 95 NA
Please input vehicle information: (<no_of_vehicles> <max_speed> <max_carriable_weight>)
2 70 200

--- Delivery Time ---
PKG1 0 750 3.98
PKG2 0 1475 1.78
PKG3 0 2350 1.42
PKG4 105 1395 0.85
PKG5 0 2125 4.19
```

---

## 🧪 Testing

The core domain logic and optimization algorithms are heavily tested using [`Vitest`](https://vitest.dev/).

```bash
# Run all tests
pnpm test
```

---

## 🏗️ Architecture & Design Decisions

### 1. Separation of Concerns

- **Domain Logic (src/core)**: Contains "pure" functions for math and optimization (e.g., Backtracking for shipment selection). These are isolated from external dependencies to ensure high testability, reusability and reliability.
- **Application Services (src/services.ts)**: Acts as the orchestration layer, connecting domain logic to fulfill specific business use cases like cost estimation and time optimization.
- **Controllers (src/controllers)**: Manages the CLI lifecycle, including user interaction, input parsing, and formatting terminal output.
- **Entry Point (src/index.ts)**: The main configuration hub for the `commander` CLI, handling command registration.
- **Data Store (src/data.ts)**: Centralized management of offer codes and business constants (currently in-memory).
- **Models (src/models.ts)**: Shared TypeScript interfaces and type definitions to ensure type safety across the entire data flow.
- **Utilities (src/utils.ts)**: Reusable helper functions for robust input validation, rounding logic, and common I/O tasks.

### 2. Standardized Controller Wrapper & Error Handling

The project utilizes a Higher-Order Function (`baseController`) to standardize the execution flow across all CLI commands. This provides several key benefits:

- **Centralized I/O Management**: It handles the lifecycle of the `readline` interface and common input parsing (like `baseDeliveryCost` and `packages`), allowing sub-controllers to focus purely on their specific I/O logic.
- **Robust Error Boundary**: It implements a `try-catch` block that wraps the entire execution. Whether an error occurs during initial argument parsing, interactive package input, or the core optimization algorithm, it is caught and formatted centrally.
- **Safe Exit Strategy**: Ensures that any validation failure or unexpected exception results in a clean error message and a non-zero exit code (`process.exit(1)`), preventing the CLI from hanging or outputting confusing stack traces to the end-user.

### 3. Optimization Algorithm

For the `delivery-time` problem, I implemented a **Backtracking Algorithm** to solve the subset-sum variations required to maximize package count and weight per shipment. Key features include:

- **Heuristic Pruning**: To optimize performance, the algorithm pre-sorts packages by weight. This allows for an "Early Break" strategy—once the current weight exceeds the **maxCarriableWeight**, the loop terminates immediately for that branch. This significantly reduces unnecessary backtracking cycles.
- **Optimal Selection Logic**: It handles complex constraints such as maximizing the number of packages first, then maximizing the total weight, and finally resolving ties based on delivery efficiency.
- **Vehicle Scheduling**: The algorithm accounts for vehicle availability and return-trip timing to ensure estimated delivery times are realistic and sequential.

---

## 🛠️ AI Disclosure

`Gemini` was used during the development of this challenge for **Syntax Help**, **Snippet Generation**, **Test Case Generation** and **Documentation Generation**.

---

## ⏳ If I Had More Time...

- **Persistence**: Replace hard-coded offer logic with a PostgreSQL or MongoDB integration.
- **Refactoring**: Decompose `getBestShipment` and `services.getDeliveryTime` into smaller, highly-focused sub-functions to further improve readability.
- **Linter**: Implement a stricter ESLint configuration with specialized rules.
- **Enhanced Testing**:
  - Add comprehensive coverage for edge cases (e.g., extreme weights, zero-distance packages).
  - Implement stress tests to identify the breaking points of the backtracking logic.
  - Add integration tests that simulate a full end-to-end CLI session from initial user input to final output.
- **Advanced Performance Optimization**: Further optimize the algorithm by replacing the full sort with more efficient selection methods (e.g., a Partial Sort or just simple loop).
