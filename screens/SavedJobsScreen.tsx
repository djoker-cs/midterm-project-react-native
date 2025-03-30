import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SavedJobsContext } from '../context/SavedJobsContext';
import { ThemeContext } from '../context/ThemeContext';
import JobCard from '../components/JobCard';
import ConfirmModal from '../components/ConfirmModal';
import { Job } from '../API/JobApi';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedJobsScreen'>;

const SavedJobsScreen: React.FC<Props> = ({ navigation }) => {
  const { savedJobs, removeJob } = useContext(SavedJobsContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [jobToRemove, setJobToRemove] = useState<Job | null>(null);

  const confirmRemoveJob = (job: Job) => {
    setJobToRemove(job);
    setModalVisible(true);
  };

  const handleRemoveConfirmed = () => {
    if (jobToRemove) {
      removeJob(jobToRemove.id);
    }
    setModalVisible(false);
    setJobToRemove(null);
  };

  const handleCancelRemove = () => {
    setModalVisible(false);
    setJobToRemove(null);
  };

  const handleApply = (job: Job) => {
    navigation.navigate('ApplicationFormScreen', { job, fromSaved: true });
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onSave={() => {}}
            onApply={handleApply}
            onRemove={() => confirmRemoveJob(item)}
            saved={true}
          />
        )}
      />
      <ConfirmModal
        visible={modalVisible}
        title="Remove Job"
        message="Are you sure you want to remove this job?"
        onConfirm={handleRemoveConfirmed}
        onCancel={handleCancelRemove}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
});

export default SavedJobsScreen;
