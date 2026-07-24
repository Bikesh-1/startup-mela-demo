import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerifyEmailProps {
  verifyUrl: string;
}

export default function VerifyEmail({
  verifyUrl,
}: VerifyEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Verify your ShareWallet account</Preview>

      <Body
        style={{
          backgroundColor: "#f4f4f5",
          fontFamily: "Arial",
        }}
      >
        <Container
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "10px",
            maxWidth: "550px",
            margin: "40px auto",
          }}
        >
          <Heading>
            Welcome to ShareWallet 🎉
          </Heading>

          <Text>
            Thanks for creating your account.
          </Text>

          <Text>
            Click the button below to verify your email.
          </Text>

          <Section
            style={{
              textAlign: "center",
              margin: "30px 0",
            }}
          >
            <Button
              href={verifyUrl}
              style={{
                backgroundColor: "#6D4DFE",
                color: "#fff",
                padding: "14px 30px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Verify Email
            </Button>
          </Section>

          <Text>
            This verification link will expire in 1 hour.
          </Text>

          <Text>
            If you didn't create this account,
            you can safely ignore this email.
          </Text>

          <Text
            style={{
              fontSize: "12px",
              color: "#666",
            }}
          >
            ShareWallet Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}