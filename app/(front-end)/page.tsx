import MainWrapper from '@/components/MainWrapper';
import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';

const payload = await getPayload({ config });

export const metadata: Metadata = {
  title: 'Observatório de Violência Política de Gênero'
};
export default async function Page() {
  const casesData = await payload.find({
    collection: 'cases',
    pagination: false,
    depth: 2
  });
  return (
    <>
      <MainWrapper cases={casesData.docs} />
    </>
  );
}
