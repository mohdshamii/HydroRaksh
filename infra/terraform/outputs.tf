output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.jalsuraksha_vpc.id
}

output "s3_bucket_name" {
  description = "Name of the S3 raster bucket"
  value       = aws_s3_bucket.water_rasters.bucket
}
