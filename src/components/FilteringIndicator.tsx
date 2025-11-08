import PromptGridSkeleton from './PromptGridSkeleton';

const FilteringIndicator = () => {
  return (
    <div className="min-h-[400px]">
      <PromptGridSkeleton count={8} />
    </div>
  );
};

export default FilteringIndicator;
