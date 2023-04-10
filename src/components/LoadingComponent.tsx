import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function LoadingComponent() {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="rectangular" sx={{ fontSize: "1rem" }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton animation="wave" variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" />
      <Skeleton animation="wave" variant="rounded" />
      <Skeleton variant="rectangular" />
      <Skeleton animation="wave" variant="rectangular" />
      <Skeleton variant="rectangular" />
      <Skeleton animation="wave" variant="rectangular" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" />
      <Skeleton animation="wave" variant="rectangular" />
      <Skeleton animation="wave" variant="rectangular" />
      <Skeleton animation="wave" variant="rectangular" />
    </Stack>
  );
}
