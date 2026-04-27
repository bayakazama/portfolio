const projects = [
    {
        name: "Project Alpha",
        description: "A cutting-edge project that revolutionizes technology.",
        link: "https://example.com/project-alpha",
    },
    {
        name: "Project Beta",
        description: "An innovative solution for modern challenges.",
        link: "https://example.com/project-beta",
    },
    {
        name: "Project Gamma",
        description: "A groundbreaking initiative in the field of science.",
        link: "https://example.com/project-gamma",
    },
]

export default function ProjectsLoader() {
    return (
        <section className="w-full py-10">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <article key={project.name} className="rounded-lg border p-4">
                            <h2 className="text-lg font-semibold">{project.name}</h2>
                            <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                            <a
                                className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Learn More
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
