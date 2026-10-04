import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="grid min-h-[80svh] place-items-center pt-24 text-center">
      <div>
        <p className="font-mono text-sm text-muted">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Здесь пока ничего не построили</h1>
        <ButtonLink href="/" className="mt-8">На главную</ButtonLink>
      </div>
    </Container>
  );
}
