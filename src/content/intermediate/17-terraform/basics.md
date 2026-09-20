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

## Hands-on commands

Local Terraform workflow (no cloud apply required for first run):

```bash
mkdir -p /tmp/tf-lab && cd /tmp/tf-lab
cat > main.tf << 'EOF'
terraform {
  required_version = ">= 1.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}
resource "local_file" "demo" {
  filename = "${path.module}/hello.txt"
  content  = "Terraform lab"
}
EOF
terraform init
terraform plan -out=tfplan
terraform apply -auto-approve tfplan
cat hello.txt
terraform destroy -auto-approve
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
