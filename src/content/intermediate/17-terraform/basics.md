# Terraform Workflow

## Goal

Use Terraform plan/apply to manage a simple cloud resource.

## Concept

**Declarative IaC:** describe desired state; Terraform reconciles reality.

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

resource "aws_s3_bucket" "logs" {
  bucket = "my-devops-lab-logs-unique"
}
```

```bash
terraform init
terraform plan
terraform apply
```

## Hands-on lab

Create one resource (bucket, firewall rule, or DNS record) in a free/low-cost tier. Destroy with `terraform destroy` when done.

## Break it

State drift — manual console change conflicts with code.

## Fix it

Import or refresh; prefer changes via Terraform only.

## Checkpoint

Explain provider, resource, plan, apply, and state.

## Next

**Metrics, Logs & Alerts**
