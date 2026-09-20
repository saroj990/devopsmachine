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
