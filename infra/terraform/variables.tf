variable "aws_region" {
  description = "Target AWS region for government cloud deployment"
  type        = string
  default     = "ap-south-1" # Mumbai, India
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}
