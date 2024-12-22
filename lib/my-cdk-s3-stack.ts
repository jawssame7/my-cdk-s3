import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from "aws-cdk-lib/aws-s3";
// dotenv
import * as dotenv from "dotenv";

// dotenvのconfigを呼び出す
dotenv.config();

export class MyCdkS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'MyCdkS3Queue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // 環境変数からバケット名を取得
    const bucketName = process.env.BUCKET_NAME;

    if (!bucketName) {
      throw new Error("BUCKET_NAMEが環境変数に定義されていません");
    }

    // create a bucket
    const bucket = new s3.Bucket(this, bucketName, {
      versioned: true, // バージョニングを有効化
      removalPolicy: cdk.RemovalPolicy.DESTROY, // スタック削除時にバケットを削除
    });
  }
}
