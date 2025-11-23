export default function AvatarCell({ value }) {
  return (
    <img
      src={value}
      alt="avatar"
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  );
}
