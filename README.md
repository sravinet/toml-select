# TOML Field Extractor Action

This GitHub Action reads a specified field from a TOML file and sets it as an
output. It's useful for workflows that need to extract data from TOML files for
further steps in the GitHub Actions pipeline.

## Status

[![Continuous Integration](https://github.com/sravinet/toml-select/actions/workflows/ci.yml/badge.svg)](https://github.com/sravinet/toml-select/actions/workflows/ci.yml) [![Coverage](https://github.com/sravinet/toml-select/blob/main/badges/coverage.svg)](https://github.com/sravinet/toml-select/blob/main/badges/coverage.svg)

## Inputs

### `file`

**Required** The path to the TOML file.

### `field`

**Required** The field to extract from the TOML file.

## Outputs

### `value`

The value of the specified field in the TOML file.

## Example Usage

```yml
uses: sravinet/toml-select@v1
with:
  file: 'path/to/file.toml'
  field: 'example.value'
```

## Compatibility

This action is compatible with most CI/CD workflows that support GitHub
Actions. It has been tested on various platforms and should work seamlessly
in any GitHub Actions setup.

The API is identical to SebRollen/toml-action

## Contribution

PRs are welcome. Suggestions: some [issues](https://github.com/sravinet/toml-select/issues) were identified.

## Credits

Copyright Sylvan Ravinet

MIT LICENCE

This action was inspired by SebRollen/toml-action. Big thanks to SebRollen
for his contributions to the GitHub Actions community.

## Background

While fixing node deprecation on toml-action, we wanted to contribute to
toml-action but ended up rewriting everything.

## In Honour of Tom Selleck

This project is made in honour of Tom Selleck, whose work has inspired many.
His dedication and contributions are greatly appreciated.

![DALL·E 2024-01-28 16 37 50 - Create an image in a pop art style, inspired by mid-20th century classic pop art techniques and color schemes  The artwork features a portrait of a co](https://github.com/sravinet/toml-select/assets/1691996/bd2c1cd6-1d49-4cee-a312-4b5fc511c98f)

## Use cases

This GitHub Action, which reads a specific field from a TOML file, can be quite
versatile and useful in various scenarios, especially in combination with
different tools and cloud services. Here are some potential use cases:

### Continuous Integration and Deployment (CI/CD) Pipelines

- GitHub Actions: Use in conjunction with other actions to set up CI/CD
pipelines.
- Jenkins: Integrate with Jenkins pipelines for projects that utilize TOML
configuration files.

### Cloud Application Deployments

- AWS, Azure, Google Cloud: Extract configuration values for cloud deployments,
such as environment variables, resource names, or identifiers.
- Kubernetes: Read configuration details for Kubernetes deployments, especially
useful for projects that store Kubernetes manifests or Helm chart values in TOML.

### Configuration Management

- Ansible/Chef/Puppet: Extract specific configurations for use in managing
infrastructure or application deployments.
- Terraform: Useful in workflows where Terraform configurations or variables
are stored in TOML files.

### Serverless Applications

- AWS Lambda or Azure Functions: Automate the deployment of serverless functions
with configurations specified in a TOML file.
- Serverless Framework: Integrate with serverless application deployments where
configuration is managed through TOML files.

### Application Release Management

- Semantic Versioning: Extract version numbers for automated release tagging and
- version management.
- Release Notes Generation: Pull specific information from TOML files to generate
or update release notes or changelogs.

### Database Operations

- Database Migration Tools: Extract database connection strings or migration
script parameters stored in TOML files.
- Environment-Specific Configurations: Manage different configurations for development,
- staging, and production databases.

### Monitoring and Analytics

- Prometheus/Grafana: Extract configuration for monitoring tools, especially
if they use TOML for settings.
- ELK Stack: Configure Elasticsearch, Logstash, and Kibana settings through
TOML files in automated setups.

### Development Tools

- Docker: Read configurations for Docker setups or Docker Compose from TOML files.
Webpack or Other Build Tools: Extract build configuration or
environment-specific settings.

- Software Testing:
Selenium or Other Testing Frameworks: Use for setting up testing environments
or test configurations.

### Feature Flag Management

- LaunchDarkly or similar services: Manage feature flags or rollouts by
extracting flag settings from TOML files.

Each use case would depend on the specific workflow requirements and how TOML
files are used within the project or organization. The flexibility of this
GitHub Action allows it to be adapted for a wide range of automation tasks
across different technologies and platforms.
