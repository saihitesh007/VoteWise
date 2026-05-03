import EVMExplainer from '../components/evm/EVMExplainer';
import VoterJourney from '../components/journey/VoterJourney';

export default function Learn() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-4xl font-black tracking-tight">Learn the Election Process</h1>
        <p className="mt-3 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          Explore the voter journey, polling booth experience, and how EVM with VVPAT records your vote.
        </p>
      </section>
      <VoterJourney />
      <EVMExplainer />
    </div>
  );
}
