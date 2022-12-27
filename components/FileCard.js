import {StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid, Platform} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {convertStringToDate} from '../App';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';

const FileCard = ({item}) => {
  const [onDownload, setDownload] = useState('');

  const navigation = useNavigation();

  const handleItemPressed = () => {
    checkPermission();
  };

  //=======================================
  //=======================================
  //=======================================
  //======For file downloading=============
  //=======================================
  //=======================================
  //=======================================

  // file url
  const fileUrl = item.location;

  // get file name
  const getFileName = () => {
    const fileNameArray = fileUrl.split('/');
    const fileName = fileNameArray[fileNameArray.length - 1];
    return fileName.split('.');
  };

  // check for file permission, check if file exist and download or open file
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // check if file exists
          RNFS.exists(
            RNFS.DownloadDirectoryPath +
              '/file_' +
              getFileName()[0] +
              '.' +
              getFileExtention(fileUrl),
          )
            .then(exist => {
              if (exist == true) {
                setTimeout(() => {
                  FileViewer.open(
                    'file://' +
                      RNFS.DownloadDirectoryPath +
                      '/file_' +
                      getFileName()[0] +
                      '.' +
                      getFileExtention(fileUrl),
                    {
                      showOpenWithDialog: true,
                    },
                  );
                }, 350);
              } else {
                downloadFile();
              }
            })
            .catch(e => {
              console.log(e);
            });

          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  // file downloader
  const downloadFile = () => {
    let date = new Date();
    let FILE_URL = fileUrl;
    let file_ext = getFileExtention(FILE_URL);
    let file_name = getFileName()[0];
    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;

    // check if file has a name or use today's date
    let path =
      file_name != null
        ? file_name + file_ext
        : Math.floor(date.getTime() + date.getSeconds() / 2) + file_ext;

    // options for config
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path: RootDir + '/file_' + path,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };

    // intialize download
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));

        //downloaded file path
        const downloadFile =
          Platform.OS === 'android' ? 'file://' + res.data : '' + res.data;

        setDownload(downloadFile);

        // open file
        setTimeout(() => {
          FileViewer.open(downloadFile, {
            showOpenWithDialog: true,
          });
        }, 350);

        alert('File Downloaded Successfully. check your downloads folder');
      });
  };

  // get file extension
  const getFileExtention = fileUrl => {
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  //=======================================
  //=======================================
  //=======================================
  //======For file downloading end=========
  //=======================================
  //=======================================
  //=======================================

  return (
    <TouchableOpacity
      onPress={() => handleItemPressed()}
      style={[styles.container]}>
      <View style={styles.leftContainer}>
        <Image
          source={
            getFileExtention(fileUrl).toLocaleString().toLowerCase() === 'pdf'
              ? require('../assets/icons/icons8-pdf-50.png')
              : getFileExtention(fileUrl).toLocaleString().toLowerCase() ===
                  'jpeg' ||
                getFileExtention(fileUrl).toLocaleString().toLowerCase() ===
                  'png' ||
                getFileExtention(fileUrl).toLocaleString().toLowerCase() ===
                  'jpg'
              ? require('../assets/icons/icons8-image-file-50.png')
              : getFileExtention(fileUrl).toLocaleString().toLowerCase() ===
                'mp4'
              ? require('../assets/icons/icons8-video-file-50.png')
              : require('../assets/icons/icons8-file-50.png')
          }
          style={{
            height: 45,
            width: 45,
          }}
        />
      </View>
      <View style={styles.rightContainer}>
        <View>
          <Text numberOfLines={1} style={[styles.headerText]}>
            {item?.name}
          </Text>
          <Text numberOfLines={1} style={styles.description}>
            {item?.size + 'mb' || 'No size'}
          </Text>
        </View>
        <View>
          <Text style={styles.date}>
            {convertStringToDate(item?.uploadedAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'center',
    padding: 20,
    borderColor: '#e6e6e6',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },

  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },

  description: {
    color: '#d9d9d9',
    marginTop: 10,
    fontSize: 16,
  },

  date: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '700',
  },

  leftContainer: {
    flex: 1.8,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 8.2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FileCard;
