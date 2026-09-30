terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# 1. Dedicated VPC for JalSuraksha
resource "aws_vpc" "jalsuraksha_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "jalsuraksha-vpc"
    Environment = var.environment
  }
}

# 2. S3 Bucket for Satellite Rasters & Data Exports
resource "aws_s3_bucket" "water_rasters" {
  bucket        = "jalsuraksha-satellite-rasters-${var.environment}"
  force_destroy = false

  tags = {
    Name        = "jalsuraksha-rasters"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_encrypt" {
  bucket = aws_s3_bucket.water_rasters.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
