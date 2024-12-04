import { CSS, Transform } from "@dnd-kit/utilities";

interface StyleProps {
    transform: Transform | null;
    transition: string | undefined;
}

/**
 * Utility function to calculate the style for sortable items
 * 
 * @param {StyleProps} props - The style properties
 * @returns {React.CSSProperties} The calculated style
 */
export const getSortableItemStyle = ({ transform, transition }: StyleProps): React.CSSProperties => ({
    transform: CSS.Transform.toString(transform),
    transition,
});