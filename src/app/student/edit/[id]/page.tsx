import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Student } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { Container } from 'react-bootstrap';

export default async function EditStuffPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  // console.log(id);
  const student: Student | null = await prisma.student.findUnique({
    where: { id },
  });
  if (!student) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <p>Student Edit</p>
        {/* <EditStudentForm student={student} /> */}
      </Container>
    </main>
  );
}