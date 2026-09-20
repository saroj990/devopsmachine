# Cloud Building Blocks

## Goal

Learn regions, compute, storage, networking, and managed services.

## Concept

```text
User → Internet → Load Balancer → App servers → Managed database
```

- **Region / AZ:** geography and fault isolation
- **Security groups:** firewall rules
- **Object storage:** blobs and backups
- **Managed DB:** operations handled by provider

## Hands-on commands

Use CLI tools (AWS example — install `aws` CLI and configure first):

```bash
# List regions (read-only discovery)
aws ec2 describe-regions --query 'Regions[].RegionName' --output text 2>/dev/null | tr '\t' '\n' | head -5 \
  || echo "Install AWS CLI or use your cloud console to list regions"
# Generic: document your architecture
cat > /tmp/cloud-arch.txt << 'EOF'
Internet -> ALB -> EC2 (app) -> RDS (private subnet)
Security group: ALB allows 443 from 0.0.0.0/0; app allows 8080 from ALB only
EOF
cat /tmp/cloud-arch.txt
```

## Hands-on lab

Sketch a three-tier architecture for a web app. Label public vs private subnets.

## Break it

App cannot reach database — security group allows SSH but not DB port from app tier.

## Fix it

Least-privilege rules: allow app SG → DB SG on DB port only.

## Checkpoint

Name four cloud primitives and their purpose.

## Next

**Terraform Workflow**
