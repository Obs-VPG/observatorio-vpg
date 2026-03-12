import MainWrapper from '@/components/MainWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Observatório de Violência Política de Gênero'
};
export default function Page() {
  return (
    <>
      <MainWrapper />
    </>
  );
}
