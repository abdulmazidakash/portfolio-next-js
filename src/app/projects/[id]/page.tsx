import ProjectDetails from "@/components/modules/projects/ProjectDetails";


export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="pt-10 container mx-auto">
      <ProjectDetails id={id} />
    </div>
  );
}