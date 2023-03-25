import ContentLoader from "react-content-loader";

export const Skeleton = () => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<circle cx="138" cy="130" r="130" />
		<rect x="0" y="296" rx="10" ry="10" width="280" height="22" />
		<rect x="0" y="345" rx="10" ry="10" width="280" height="86" />
		<rect x="0" y="455" rx="10" ry="10" width="95" height="30" />
		<rect x="130" y="447" rx="24" ry="24" width="150" height="45" />
	</ContentLoader>
)