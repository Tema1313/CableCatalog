import { CatsPageLayout } from '@/pages/cats';
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/cat/$catId')({
  component: RouteComponent,
})

function RouteComponent() {
  const catId = useParams({
		from: "/cat/$catId",
		select: ({ catId }) => Number(catId),
	});
	return <CatsPageLayout catId={catId} />;
}
