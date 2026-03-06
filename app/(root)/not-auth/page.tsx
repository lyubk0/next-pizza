import { InfoBlock } from "@/components/shared/info-block";

export default function NotAuthPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
<<<<<<< HEAD
        title="Доступ заблокований"
        text="Ця сторінка доступна тільки для зареєстрованих користувачів"
=======
        title="Access denied"
        text="This page is available only for registered users"
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
        imageUrl="/lock.png"
      />
    </div>
  );
}
